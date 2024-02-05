::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::Caution Do Not put spaces after the = on any of the set variables!!!	::
::Example of what not to do >>>>>>>>> "CommandLine = TheIsland_WP"		::
::Example of correct way to do it >>> "CommandLine=TheIsland_WP"		::
::Make sure it is all encased with quotes								::
::Doing this wrong will cause error when starting server				::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

::your discord server ID where your bot will be listening
set "discordServerID=4654561515456461"

::your discord bots ID
set "discordBotID=52414564654891456156"

::If you want buttons to start/stop/restart/ect for your server set this to true
::Will not work with Nitrado servers so it will need to be set to false.
::This also only works if bot is running on same machine as server
set "serverControl=true"

::Discord channel ID where your server control buttons will appear.
::Make this an admin channel only or everyone will have control of your server.
::Make it a channel that is not going to be used for chatting because any message sent
::is read by the bot as an RCON command and could crash the bot if to many wrong commands are sent
::When sending RCON commands do not use quotes. (Example: ListPlayers) is what your would send in the chat to get a list of players from server using RCON
::If serverControl is set to false you can still use this channel to send RCON commands. RCON feature should work for Nitrado servers.
set "adminChanelID=45646456145648954"

::if you want mod updates set this to true if not than set it to false
set "modUpdates=true"

::Curseforge API Token, this is free but requires a google account to login and can be obtained from https://console.curseforge.com/#/login
::Bot uses this to keep an eye on mod changes to automatically keep mods up to date on your server
::if you do not get a token than you will not be able to use modUpdates and should set modUpdates=false above or bot will likely crash
set "CFToken=adfkjkajfiojaivnmkajgfioajhfkjnakljjnvikoajfgioaadfgjkjikjio"

::set the ID of the channel you want info for mod updates to be posted to.
::This tells the players the mod name, date it was updated, and a link to the mod page.
::If modUpdates is set to false than leave it alone having random numbers will not hurt anything.
set "modChannel=14561456489489416156548945156148594984"

::List mods for the bot to look for updates on and trigger a server restart with warnings to update the outdated mod. (seperate each mod id with commas, dont use spaces)
::Updates to mods are done with -automanagedmods in your commandline
set "modIDs=947835,937546,961601,940786,931119,946694,928708,928501,930404,928621"

::your bots token from bot you create at https://discord.com/developers/
set "botToken=ajdkfjakdjfkajnfklnjakjnfgiojaiofjiokanjfkojnaoifvjiofajioajf"

::Battlemetrics Personal Access Token, this is free to obtain and can get from https://www.battlemetrics.com/developers
::Currently not in use
set "BMToken=agfafg45fg45fdg5sdf4ghd4sag54a5g15a4848g12sg184fvgb814asg56r14g54rg89as5g451re5g4a89rg45r8ehg45rjh4y56j4et85yj4ytu85jk4ytu5j41et5yj4y89e4jh85try4jh54wejh5664wtrs58h4s"

::Battlemetrics server ID, Find your server on battlemetrics and select it then in adress bar copy the ID number.
::Example: https://www.battlemetrics.com/servers/arksa/24950685 
::BMServerID would be 24950685
::Currently not in use
set "BMServerID=23842895"

::Change this to the hour you want server to restart. military (12=12pm 00=12am) https://www.ontheclock.com/convert-military-24-hour-time.aspx
set "restartHour=00"

::set to true if you want in game chat to post to discord
::this should work fine with nitrado servers.
set "gameChat=true"

::set this to false if you do not want messages sent in game from discord
::if set to true than discord members who are not in game can send chat messages to players in game
set "discordChat=true"

::discord channel ID were in game chat is to be sent to, if discordChat=true from above than it would be a good idea
::to have a dedicated channel for game chat only due to any message sent in discord in this channel will go in game
::if gameChat=false and discordChat=false from above than just leave random numbers here and all should be good.
::if either one is set to true than you need a channel ID here.
set "chatChannelID=456465456489414515641894"

::Name of your server that players see when they search for it
set "serverName=VGS ISLAND PVE BOOSTED"

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
set "CommandLine=TheIsland_WP?listen?Port=7777?MaxPlayers=70? -NoBattlEye -automanagedmods -Mods=947835,937546,961601,940786,931119,946694,928708,928501,930404,928621,929420,930128,933099,931877,929543,929038,928818,929713,931047,931874,955451,934401,955932,943713,927131,926956,916922,914844,912902,900062 -crossplay -servergamelog -game -server -log"

::set your password you use to log in as admin in game here for rcon to work with the bot
set "adminPassword=YourPasswordHere"

::set your global ip and the servers port (IP:Port). To get your global ip go to google and search: what is my ip
::this is used for gamedig query to get player counts for bot status
::EXAMPLE: 12.34.567.890:7777
set "globalIP=12.32.567.890"

::set the servers port
::used for rcon functionality 
set "gamePort=7777"

::The bot should run on same machine as server for everything to work correctly.
::If you run a Nitrado server you can run the bot on your own machine but you cant use button controls for start, stop, restart ect.
::you can get use of rcon, player counts, and game chat when running on different machine than the server
::If running on same machine as server keep this as default rcon will not work if it is set to global IP
::If running on a seperate machine than the server set this to the servers global IP adress for rcon and game chat to work.
::Set your ports local IP (default 127.0.0.1)
set "serverIP=127.0.0.1"

::set your servers rcon port
set "rconPort=27020"


:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::DONT TOUCH ANYTHING BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING OR YOU WILL BREAK THINGS!!
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
@echo off

Taskkill /F /FI "WINDOWTITLE eq ASA %serverName% Server Controller Bot" /T

timeout 1 > NUL
set NLM=^



set NL=^^^%NLM%%NLM%^%NLM%%NLM%


echo Server_Control = %serverControl%%NL%Mod_Updates = %modUpdates%%NL%GameServerPath = %GameserverPath%\%NL%SteamPath = %STEAMPATH%\%NL%EXELauncher = %EXELauncher%%NL%TOKEN = %botToken%%NL%BMToken = %BMToken%%NL%CFToken = %CFToken%%NL%BMServerID = %BMServerID%%NL%DiscordServer_ID = %discordServerID%%NL%Bot_ID = %discordBotID%%NL%Admin_Channel_ID = %adminChanelID%%NL%Game_Chat = %gameChat%%NL%Discord_Chat = %discordChat%%NL%Chat_Channel_ID = %chatChannelID%%NL%Mod_Channel = %modChannel%%NL%restartHour = %restartHour%%NL%Bot_Folder_Path = %~dp0%NL%Map_name = %mapSlashCommands%%NL%Message_Tittle = %serverName%%NL%Global_IP = %globalIP%%NL%Game_Port = %gamePort%%NL%ASA_ServerIP = %serverIP%%NL%ASA_rcon_port = %rconPort%%NL%ASA_password = %adminPassword%%NL%Mod_IDs = %modIDs%%NL%Command_Line = "%CommandLine%">%~dp0.env
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
