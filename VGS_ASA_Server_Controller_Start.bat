::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::Caution Do Not put spaces after the = on any of the set variables!!!	::
::Example of what not to do >>>>>>>>> CommandLine = TheIsland_WP		::
::Example of correct way to do it >>> CommandLine=TheIsland_WP			::
::Doing this wrong will cause error when starting server				::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

::your bots token from bot you create at https://discord.com/developers/
set "botToken=daf4sd5f4a5dsf456a41f5f4a51d5f1asd5f1a56sdf4g156asd4f1g654adsf564a"

::your discord server ID where your bot will be listening
set "discordServerID=54465456456484544564"

::your discord bots ID
set "discordBotID=48948948456415489489489"

::discord channel ID where your commands will only work from, so normal players cannot mess with your server
set "adminChanelID=1215154894545122515"

::discord channel ID were in game chat is to be sent to
set "chatChannelID=4789748443541541685484"

::Name of your server that players see when they search for it
set "serverName=VGS ISLAND PVE BOOSTED"

::Change this to the hour you want server to restart. military (12=12pm 00=12am) https://www.ontheclock.com/convert-military-24-hour-time.aspx
set "restartHour=00"

::name of server all lowercase and no spaces. 
::IMPORTANT: do not use spaces or capital letters in name, use underscore in place of spaces.
::Used in creating slash command for this server
::EXAMPLE: vgs_island_pve_boosted
set "mapSlashCommands=vgs_island_pve_boosted"

::If your using Server API then set this to AsaApiLoader.exe
::If you have no idea or you are NOT using Server API than set to ArkAscendedServer.exe
::info about server API found here https://gameservershub.com/forums/resources/categories/asa-official-resources.111/
set "EXELauncher=ArkAscendedServer.exe"

::Set file path to the folder your server files are located or will be located.
set "GameserverPath=C:\VGS_Server_Files\ARK_Survival_Ascended\The_Island"

::Set file path to the folder your steam cmd files are located
set "STEAMPATH=C:\VGS_Server_Files\Steam_CMD_Files"

::Set the start up command line for your ark server.
set "CommandLine=TheIsland_WP?listen?Port=7777?MaxPlayers=70? -NoBattlEye -automanagedmods -Mods=931119,946694,928708,928501,930404,928621,929420,930128,933099,931877,929543,929038,928818,929713,931047,931874,955451,934401,955932,943713,927131,926956,916922,914844,912902,900062 -crossplay -servergamelog -game -server -log"

::set your password you use to log in as admin in game here for rcon to work with the bot
set "adminPassword=YOURPASSWORDHERE"

::set your global IP. To get your global IP go to google and search: what is my IP
::used for bot to query gamedig for iformation about server such as player counts
::EXAMPLE: 12.34.567.890
set "globalIP=12.34.567.789"

::set the servers port 
set "gamePort=7777"

::The bot should run on same machine as server for everything to work correctly.
::used for bot to send rcon commands
::Set your ports local IP (default 127.0.0.1)
set "serverIP=127.0.0.1"

::set your servers rcon port
::used for bot to send rcon commands
set "rconPort=27020"


:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::DONT TOUCH ANYTHING BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING OR YOU WILL BREAK THINGS!!
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
@echo off

Taskkill /F /FI "WINDOWTITLE eq ASA %serverName% Server Controller Bot" /T

timeout 1 > NUL
set NLM=^



set NL=^^^%NLM%%NLM%^%NLM%%NLM%


echo GameServerPath = %GameserverPath%\%NL%SteamPath = %STEAMPATH%\%NL%EXELauncher = %EXELauncher%%NL%TOKEN = %botToken%%NL%BMToken = %BMToken%%NL%BMServerID = %BMServerID%%NL%DiscordServer_ID = %discordServerID%%NL%Bot_ID = %discordBotID%%NL%Admin_Channel_ID = %adminChanelID%%NL%Chat_Channel_ID = %chatChannelID%%NL%mod_Update_Bot = %modUpdateBotName%%NL%restartHour = %restartHour%%NL%Bot_Folder_Path = %~dp0%NL%Map_name = %mapSlashCommands%%NL%Message_Tittle = %serverName%%NL%Global_IP = %globalIP%%NL%Game_Port = %gamePort%%NL%ASA_ServerIP = %serverIP%%NL%ASA_rcon_port = %rconPort%%NL%ASA_password = %adminPassword%%NL%Command_Line = "%CommandLine%">%~dp0.env
for /f "usebackq tokens=* delims=" %%a in ("%~dp0.env") do (echo(%%a)>>~.env
move /y  ~.env "%~dp0.env"
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
