@echo off

COLOR 0a

SETLOCAL EnableExtensions enabledelayedexpansion

goto StartServer

:StartServer
start /min %~1\ShooterGame\Binaries\Win64\%~3 %~4
set startHour=%TIME:~0,2%
IF "%startHour:~0,1%" == " " set startHour=0%startHour:~1,1%
set startMinute=%TIME:~3,2%
set startSeconds=%TIME:~6,2%
echo     %~2 server was started at %startHour%:%startMinute%:%startSeconds%