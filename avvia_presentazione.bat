@echo off
title Avvio Scheda Tecnica e Quiz Émile Zola (Locale)
color 0B
echo ===================================================================
echo   AVVIO SCHEDA TECNICA DIGITALE & QUIZ LIVE — EMILE ZOLA
echo ===================================================================
echo.
echo Controllo dell'ambiente di esecuzione locale...

where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Node.js rilevato. Avvio del server ad alte prestazioni...
    node server.js
    goto end
)

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Python rilevato. Avvio del server Python...
    python server.py
    goto end
)

echo [INFO] Nessun runtime rilevato. Apertura diretta del file nel browser...
start index.html

:end
pause
