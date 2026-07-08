@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ========== 构建发布包 ==========
echo.
npm run release
pause