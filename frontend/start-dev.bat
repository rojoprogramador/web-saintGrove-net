@echo off
REM SaintGrove Development Server Startup Script

echo.
echo ================================
echo SaintGrove Development Server
echo ================================
echo.

REM Limpiar cache de Next.js
echo Limpiando cache de Next.js...
if exist .next (
    rmdir /s /q .next
)

REM Verificar que las dependencias esten instaladas
if not exist node_modules (
    echo.
    echo Instalando dependencias...
    call npm install
)

REM Iniciar servidor de desarrollo
echo.
echo Iniciando servidor en http://localhost:3000
echo.
call npm run dev
