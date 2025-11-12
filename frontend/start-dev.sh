#!/bin/bash

# SaintGrove Development Server Startup Script

echo "🚀 Iniciando SaintGrove Development Server..."
echo ""

# Limpiar procesos anteriores de Node.js (opcional)
# killall node 2>/dev/null || echo "No hay procesos de Node.js corriendo"

# Limpiar cache de Next.js
echo "🧹 Limpiando cache de Next.js..."
rm -rf .next

# Verificar que las dependencias estén instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Iniciar servidor de desarrollo
echo ""
echo "✨ Iniciando servidor en http://localhost:3000"
echo ""
npm run dev
