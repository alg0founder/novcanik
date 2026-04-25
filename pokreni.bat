@echo off
title Novcanik Dev Server
color 0A
cd /d "%~dp0"

echo.
echo  ==========================================
echo   Novcanik - Pokretanje lokalnog servera
echo  ==========================================
echo.

if not exist "node_modules\.package-lock.json" (
    echo  [1/2] Instaliram pakete (jednom, ceka malo...)
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo  GRESKA: npm install nije uspeo!
        pause
        exit /b 1
    )
    echo.
)

echo  [2/2] Pokrecem server...
echo.
echo  ==========================================
echo.
echo    Otvori browser i ukucaj:
echo.
echo         http://localhost:7100
echo.
echo  ==========================================
echo.
echo  Zatvori ovaj prozor da zaustavljas server.
echo.

npm run dev
