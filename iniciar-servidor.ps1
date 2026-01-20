# Script para iniciar el servidor proxy de Domo
Write-Host "🚀 Iniciando servidor proxy de Domo..." -ForegroundColor Green
Write-Host ""

# Verificar si node está instalado
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js no está instalado. Por favor instálalo desde https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Verificar si las dependencias están instaladas
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    npm install
}

Write-Host ""
Write-Host "🌐 Iniciando servidor en http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  IMPORTANTE:" -ForegroundColor Yellow
Write-Host "   1. Abre https://unitru-edu-pe.domo.com en otra pestaña e inicia sesión" -ForegroundColor White
Write-Host "   2. Luego abre http://localhost:3000 en tu navegador" -ForegroundColor White
Write-Host ""
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Gray
Write-Host ""

# Iniciar el servidor
node server.js
