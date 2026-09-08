param([switch]$NoDialogs)

$ErrorActionPreference = 'Stop'
$projectRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$stateFile = Join-Path $projectRoot '.local\preview.json'

try {
    if (-not (Test-Path -LiteralPath $stateFile)) { exit 0 }
    $savedState = Get-Content -LiteralPath $stateFile -Raw | ConvertFrom-Json
    if ($savedState.projectRoot -ne $projectRoot) { throw 'The saved preview belongs to a different project.' }
    $previewProcess = Get-Process -Id ([int]$savedState.processId) -ErrorAction SilentlyContinue
    if ($null -eq $previewProcess) { exit 0 }
    if ($previewProcess.ProcessName -ne 'node' -or $previewProcess.StartTime.ToUniversalTime().Ticks.ToString() -ne $savedState.startTimeTicks) {
        throw 'The saved preview process has changed. No process was stopped.'
    }
    $stopProcess = Start-Process -FilePath "$env:SystemRoot\System32\taskkill.exe" -ArgumentList "/PID $($previewProcess.Id) /T /F" -WindowStyle Hidden -Wait -PassThru
    if ($stopProcess.ExitCode -ne 0) { throw 'The preview could not be stopped. Please try Stop Website again.' }
    Write-Output 'Goodshrub preview stopped.'
} catch {
    if ($NoDialogs) { Write-Error $_.Exception.Message -ErrorAction Continue }
    else {
        Add-Type -AssemblyName System.Windows.Forms
        [System.Windows.Forms.MessageBox]::Show($_.Exception.Message, 'Goodshrub', 'OK', 'Error') | Out-Null
    }
    exit 1
}
