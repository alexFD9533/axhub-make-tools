@echo off
chcp 65001 >/dev/null
cd /d "D:\地方综管平台\dfzg-project-shuan-demo"
echo ========================================
echo  项目快速备份工具
echo ========================================
echo.
node scripts/quick-save.mjs
echo.
pause
