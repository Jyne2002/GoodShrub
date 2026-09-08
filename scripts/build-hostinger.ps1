param([switch]$NoDialogs)

$ErrorActionPreference = 'Stop'
$projectRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$localDirectory = Join-Path $projectRoot '.local'
$exportDirectory = Join-Path $projectRoot 'out'
$packageDirectory = Join-Path $projectRoot 'hostinger'
$archivePath = Join-Path $packageDirectory 'goodshrub-hostinger.zip'
$previousExportSetting = $env:HOSTINGER_EXPORT
$previousTelemetrySetting = $env:NEXT_TELEMETRY_DISABLED

function Invoke-NextBuild([string]$LogName) {
    $nextCli = Join-Path $projectRoot 'node_modules\next\dist\bin\next'
    $buildProcess = Start-Process -FilePath $nodeCommand.Source -ArgumentList "`"$nextCli`" build" -WorkingDirectory $projectRoot -WindowStyle Hidden -Wait -PassThru -RedirectStandardOutput (Join-Path $localDirectory "$LogName.log") -RedirectStandardError (Join-Path $localDirectory "$LogName-error.log")
    if ($buildProcess.ExitCode -ne 0) {
        throw "The website build failed. Details: $localDirectory\$LogName-error.log"
    }
}

try {
    $nodeCommand = Get-Command node.exe -ErrorAction SilentlyContinue
    if (-not $nodeCommand) { throw 'Please install Node.js, then double-click Open Website once before building the ZIP.' }
    if (-not (Test-Path -LiteralPath (Join-Path $projectRoot 'node_modules\next\dist\bin\next'))) {
        throw 'Double-click Open Website once to finish setup, then try Build Hostinger ZIP again.'
    }
    New-Item -ItemType Directory -Force -Path $localDirectory, $packageDirectory | Out-Null

    $env:NEXT_TELEMETRY_DISABLED = '1'
    $env:HOSTINGER_EXPORT = '1'
    Invoke-NextBuild 'hostinger-export'
    if (-not (Test-Path -LiteralPath (Join-Path $exportDirectory 'index.html'))) {
        throw 'The export did not produce index.html. The ZIP was not updated.'
    }

    # Keep the regular Next.js production build available alongside the export.
    $env:HOSTINGER_EXPORT = '0'
    Invoke-NextBuild 'hostinger-next-build'

    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $temporaryZip = Join-Path $localDirectory ('hostinger-' + [guid]::NewGuid().ToString('N') + '.zip')
    [System.IO.Compression.ZipFile]::CreateFromDirectory($exportDirectory, $temporaryZip, [System.IO.Compression.CompressionLevel]::Optimal, $false)
    Move-Item -LiteralPath $temporaryZip -Destination $archivePath -Force
    Write-Output "Ready to upload: $archivePath"

    if (-not $NoDialogs) {
        Add-Type -AssemblyName System.Windows.Forms
        [System.Windows.Forms.MessageBox]::Show("Your upload file is ready:`n`n$archivePath`n`nUpload it to your Hostinger website's public_html folder and extract it there.", 'Goodshrub - ZIP ready', 'OK', 'Information') | Out-Null
    }
} catch {
    if ($NoDialogs) { Write-Error $_.Exception.Message -ErrorAction Continue }
    else {
        Add-Type -AssemblyName System.Windows.Forms
        [System.Windows.Forms.MessageBox]::Show($_.Exception.Message, 'Goodshrub - Build failed', 'OK', 'Error') | Out-Null
    }
    exit 1
} finally {
    $env:HOSTINGER_EXPORT = $previousExportSetting
    $env:NEXT_TELEMETRY_DISABLED = $previousTelemetrySetting
}
