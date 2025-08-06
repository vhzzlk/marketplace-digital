@echo off 
echo Iniciando marketplace completo... 
start start-backend.bat 
timeout /t 3 
start start-frontend.bat 
