@echo off

Taskkill /F /FI "WINDOWTITLE eq ASA %serverName% Server Controller Bot" /T

timeout 1 > NUL

COLOR 0a

SETLOCAL EnableExtensions enabledelayedexpansion

TITLE ASA %serverName% Server Controller Bot

set "workdir=%GameserverPath%\ShooterGame\Binaries\Win64\"
set "workdir=%workdir:\=\\%"

node src/register-commands.js
@cls
node src/index.js

timeout 5 >nul
powershell -window minimized -command ""
