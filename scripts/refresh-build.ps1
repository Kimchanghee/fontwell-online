#!/usr/bin/env pwsh
# fontwell.online: refresh data -> build -> publish gate. Exits non-zero on any failure.
# Refresh failures keep the last good snapshot (the script itself logs a warning and continues);
# build or gate failures stop the run so the parent never deploys a broken dist/.
$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot '..')
$env:ASTRO_TELEMETRY_DISABLED = '1'
function Step([string]$label, [scriptblock]$cmd) {
  Write-Host "== $label"
  & $cmd
  if ($LASTEXITCODE -ne 0) { Write-Error "$label failed (exit $LASTEXITCODE)"; exit $LASTEXITCODE }
}
if (-not (Test-Path 'node_modules')) { Step 'install' { pnpm install --frozen-lockfile } }
Step 'refresh' { node scripts/refresh.mjs }
Step 'og images' { node scripts/og.mjs }
Step 'build' { node node_modules/astro/bin/astro.mjs build }
Step 'gate' { node scripts/gate.mjs }
Write-Host '== done: dist/ is ready to deploy'
exit 0
