@echo off
chcp 65001 >nul
echo 正在啟動 狐樂・絆之勝負 ...
start http://127.0.0.1:4173/
npm run dev
pause
