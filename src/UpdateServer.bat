@echo off

COLOR 0a

SETLOCAL EnableExtensions enabledelayedexpansion
set GameServerBRANCH=2430930
goto ServerUpdate

:ServerUpdate
cls
set STEAMLOGIN=anonymous

echo.
echo     You are about to update your %~2 server
echo        Dir: %~1
echo        Branch: %GameServerBRANCH%
echo.
%~3\steamcmd.exe +force_install_dir %~1  +login %STEAMLOGIN% +"app_update %GameServerBRANCH%" validate +quit
echo.
echo     %~2 server is up to date