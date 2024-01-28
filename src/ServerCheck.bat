@echo off
SETLOCAL EnableExtensions enabledelayedexpansion

set "workdir=%~1\ShooterGame\Binaries\Win64\
set "workdir=%workdir:\=\\%"

goto ServerCheck

:ServerCheck
@cls
for /f "usebackq tokens=* delims=" %%a in (`
    wmic process  where 'CommandLine like "%%!workdir!%%" and not CommandLine like "%%RuntimeBroker%%"'   get CommandLine^,ProcessId  /format:value
`) do (
    for /f "tokens=* delims=" %%G in ("%%a")  do (
        if "%%G" neq "" (
            set "%%G"
            goto Online
        )
    )
) 
goto Offline

:Online
set Status=Online
goto CheckDone

:Offline
set Status=Offline
goto CheckDone

:CheckDone
Echo %~2 Server %Status%