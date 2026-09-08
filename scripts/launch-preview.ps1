param(
    [switch]$NoBrowser,
    [switch]$NoDialogs
)

$ErrorActionPreference = 'Stop'
$projectRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$localDirectory = Join-Path $projectRoot '.local'
$stateFile = Join-Path $localDirectory 'preview.json'
$nextCli = Join-Path $projectRoot 'node_modules\next\dist\bin\next'
$previewProcess = $null
$progressForm = $null
$mutex = $null
$ownsMutex = $false

function Test-GoodshrubPage([string]$Address) {
    try {
        $response = Invoke-WebRequest -Uri $Address -UseBasicParsing -TimeoutSec 2
        return $response.StatusCode -eq 200 -and $response.Headers['X-Goodshrub-Preview'] -eq 'nextjs'
    } catch { return $false }
}

function Test-PortInUse([int]$Port) {
    $client = New-Object System.Net.Sockets.TcpClient
    try {
        $connection = $client.BeginConnect('127.0.0.1', $Port, $null, $null)
        if (-not $connection.AsyncWaitHandle.WaitOne(300)) { return $false }
        $client.EndConnect($connection)
        return $true
    } catch { return $false }
    finally { $client.Dispose() }
}

function Show-Progress([string]$Message) {
    if ($NoDialogs) { return }
    $progressLabel.Text = $Message
    [System.Windows.Forms.Application]::DoEvents()
}

try {
    $hashAlgorithm = [System.Security.Cryptography.SHA256]::Create()
    try {
        $projectHash = [System.BitConverter]::ToString($hashAlgorithm.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($projectRoot))).Replace('-', '')
    } finally { $hashAlgorithm.Dispose() }
    $mutex = New-Object System.Threading.Mutex($false, "Local\Goodshrub-$projectHash")
    try { $ownsMutex = $mutex.WaitOne(0) }
    catch [System.Threading.AbandonedMutexException] { $ownsMutex = $true }
    if (-not $ownsMutex) { exit 0 }

    if (-not $NoDialogs) {
        Add-Type -AssemblyName System.Windows.Forms
        $progressForm = New-Object System.Windows.Forms.Form
        $progressForm.Text = 'Goodshrub'
        $progressForm.Width = 440
        $progressForm.Height = 150
        $progressForm.StartPosition = 'CenterScreen'
        $progressForm.FormBorderStyle = 'FixedDialog'
        $progressForm.ControlBox = $false
        $progressLabel = New-Object System.Windows.Forms.Label
        $progressLabel.SetBounds(22, 20, 385, 40)
        $progressLabel.Text = 'Opening your Goodshrub website...'
        $progressForm.Controls.Add($progressLabel)
        $progressBar = New-Object System.Windows.Forms.ProgressBar
        $progressBar.SetBounds(22, 67, 380, 10)
        $progressBar.Style = 'Marquee'
        $progressForm.Controls.Add($progressBar)
        $progressForm.Show()
        [System.Windows.Forms.Application]::DoEvents()
    }

    $nodeCommand = Get-Command node.exe -ErrorAction SilentlyContinue
    if (-not $nodeCommand) { throw 'Please install Node.js 20.9 or newer from nodejs.org, then double-click Open Website again.' }
    $versionText = (& $nodeCommand.Source --version).TrimStart('v')
    if ([version]$versionText -lt [version]'20.9.0') { throw 'Please update Node.js to version 20.9 or newer, then double-click Open Website again.' }
    New-Item -ItemType Directory -Force -Path $localDirectory | Out-Null

    $dependenciesReady = (Test-Path -LiteralPath $nextCli) -and
        (Test-Path -LiteralPath (Join-Path $projectRoot 'node_modules\react\package.json')) -and
        (Test-Path -LiteralPath (Join-Path $projectRoot 'node_modules\react-dom\package.json'))
    if (-not $dependenciesReady) {
        Show-Progress 'Setting up the website for the first time. Please stay connected to the internet...'
        $npmCommand = Get-Command npm.cmd -ErrorAction SilentlyContinue
        if (-not $npmCommand) { throw 'The Node.js installation is incomplete. Please reinstall Node.js and double-click Open Website again.' }
        $npmCli = Join-Path (Split-Path -Parent $npmCommand.Source) 'node_modules\npm\bin\npm-cli.js'
        if (-not (Test-Path -LiteralPath $npmCli)) { throw 'Could not find the Node.js package installer. Please reinstall Node.js and try again.' }
        $setupProcess = Start-Process -FilePath $nodeCommand.Source -ArgumentList "`"$npmCli`" ci --no-audit --no-fund" -WorkingDirectory $projectRoot -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $localDirectory 'setup.log') -RedirectStandardError (Join-Path $localDirectory 'setup-error.log')
        while (-not $setupProcess.HasExited) {
            if (-not $NoDialogs) { [System.Windows.Forms.Application]::DoEvents() }
            Start-Sleep -Milliseconds 200
            $setupProcess.Refresh()
        }
        $setupProcess.WaitForExit()
        if (-not (Test-Path -LiteralPath $nextCli) -or $setupProcess.ExitCode -ne 0) { throw "Website setup failed. Check your internet connection and try again. Details: $localDirectory\setup-error.log" }
    }

    $previewPort = $null
    $serverReady = $false
    $ports = @(3000..3010)
    if (Test-Path -LiteralPath $stateFile) {
        try {
            $savedState = Get-Content -LiteralPath $stateFile -Raw | ConvertFrom-Json
            if ($savedState.projectRoot -eq $projectRoot -and $savedState.port -ge 3000 -and $savedState.port -le 3010) {
                $ports = @([int]$savedState.port) + @($ports | Where-Object { $_ -ne $savedState.port })
            }
        } catch { }
    }
    foreach ($port in $ports) {
        if (Test-PortInUse $port) {
            if (Test-GoodshrubPage "http://127.0.0.1:$port") {
                $previewPort = $port
                $serverReady = $true
                break
            }
        } else {
            $previewPort = $port
            break
        }
    }
    if ($null -eq $previewPort) { throw 'The local preview ports are busy. Close another development server and double-click Open Website again.' }
    $previewUrl = "http://127.0.0.1:$previewPort"

    if (-not $serverReady) {
        Show-Progress 'Starting Goodshrub. Your browser will open when the page is ready...'
        $env:NEXT_TELEMETRY_DISABLED = '1'
        $previewProcess = Start-Process -FilePath $nodeCommand.Source -ArgumentList "`"$nextCli`" dev --hostname 127.0.0.1 --port $previewPort" -WorkingDirectory $projectRoot -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $localDirectory 'preview.log') -RedirectStandardError (Join-Path $localDirectory 'preview-error.log')
        @{
            processId = $previewProcess.Id
            startTimeTicks = $previewProcess.StartTime.ToUniversalTime().Ticks.ToString()
            projectRoot = $projectRoot
            port = $previewPort
        } | ConvertTo-Json | Set-Content -LiteralPath $stateFile -Encoding UTF8

        $deadline = [DateTime]::UtcNow.AddSeconds(150)
        while ([DateTime]::UtcNow -lt $deadline) {
            if (-not $NoDialogs) { [System.Windows.Forms.Application]::DoEvents() }
            $previewProcess.Refresh()
            if ($previewProcess.HasExited) { throw "The website could not start. Details: $localDirectory\preview-error.log" }
            if (Test-GoodshrubPage $previewUrl) { $serverReady = $true; break }
            Start-Sleep -Milliseconds 350
        }
        if (-not $serverReady) { throw "The website is taking longer than expected to start. Try Open Website again in a moment. Details: $localDirectory\preview-error.log" }
    }

    if (-not $NoBrowser) {
        $browserInfo = New-Object System.Diagnostics.ProcessStartInfo
        $browserInfo.FileName = $previewUrl
        $browserInfo.UseShellExecute = $true
        [System.Diagnostics.Process]::Start($browserInfo) | Out-Null
    }
    Write-Output "Goodshrub is ready: $previewUrl"
} catch {
    $errorMessage = $_.Exception.Message
    if ($NoDialogs) { Write-Error $errorMessage -ErrorAction Continue }
    else {
        Add-Type -AssemblyName System.Windows.Forms
        [System.Windows.Forms.MessageBox]::Show($errorMessage, 'Goodshrub could not open', 'OK', 'Error') | Out-Null
    }
    exit 1
} finally {
    if ($null -ne $progressForm) { $progressForm.Close(); $progressForm.Dispose() }
    if ($ownsMutex) { $mutex.ReleaseMutex() }
    if ($null -ne $mutex) { $mutex.Dispose() }
}
