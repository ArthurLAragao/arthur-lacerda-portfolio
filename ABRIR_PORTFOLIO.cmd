@echo off
setlocal
cd /d "%~dp0"
where python >nul 2>nul
if errorlevel 1 (
  start "" "%~dp0dist\index.html"
  exit /b
)
echo Abra http://127.0.0.1:4173 no navegador.
echo Mantenha esta janela aberta. Ctrl+C encerra o servidor.
python -m http.server 4173 --bind 127.0.0.1 --directory "%~dp0dist"
if errorlevel 1 pause
