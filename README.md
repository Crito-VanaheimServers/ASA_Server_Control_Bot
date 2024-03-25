# ASA_Server_Control_Bot
ASA Server Control Bot
By Crito @Vanaheim Gaming Servers
https://discord.gg/pxC7qSzQ8X
v2.7 03/24/2024

Buy me a pizza:
https://www.paypal.com/paypalme/VanaheimServers

Thanks to:
Fingledobe @Stomping Grounds
His extensive testing throught
the work of this project helped
get it to where it is.
https://discord.gg/stompinggrounds


License:
    MIT License

install video: 
coming soon

node.js download
https://nodejs.org/en

Discord developer site
https://discord.com/developers/applications

Bot controls Ark Survival Ascended Server. Designate a specific channel for admin use only so users with
permissions to that channel can use the buttons to start, Stop, Restart your server from discord
if needed keeping your server files safe. The bot has other functionality built into it read below.

Rented servers can use this bot but Iam unaware of how well it performs with rented servers.
Rented servers can take advantage of game chat to discord and from discord, mod updates to discord,
player count status on bot, and rcon commands sent from discord

If you run multiple servers this bot will handle them all if the bot config file (default.json) is setup for multiple bots.

This works with Server API if you use it just set the exe to use in the bots config file (default.json) found in the config folder of the bot.

BUTTONS
    Start button: Starts server if it is not running
               
    Stop button: will safely save the world and shut down server.

    Restart button: will first check if the server is running or not and if it is running than it will safely 
                     save the world and shut down the server, Then check for any
                     game updates and apply them if needed. Finally the server will start.

    Restart with warning button: Does what the restart command does but gives in game warnings starting at 15 minutes before
                                  the restart takes place to give players time to prepare for restart.

    Shutdown with warning button: Does what the Stop command does but gives in game warnings starting at 15 minutes before
                                   the shutdown takes place to give players time to prepare for shutdown.

    Cancel warning button: can be used to stop the restart with warning command or the shutdown with warning command so server will
                            not perform those actions.

    Destroy wild Dinos button: Use to destroy all wild dions on the map so new/fresh dinos can start spawning in.
	
	Rcon button: used to open discord modal where you can type your command to send to server.
	
	Online player list button: used to get a list of players currently online with EosID of each player.
	
	Get player info button: if the games save files (.arkprofiles and .arktribe files) are on the same machine as the bot and save 
							path to these files are set in the bots config file (default.json) than this function will allow you to
							get information about the player you enter into it.
							
BOT MONITORS
	
	CRASHES: If server crashes than the bot will detect that it has gone down and bring it back online sending you a message in discord
	that the server had a possible crash.

    TIME: Checks system time and when it reaches 15 minutes prior to your desired restart time it will start sending
    in game warnings to players chat and broadcast at top of screen, so they have time to log off before world save and server restart.
	
	MOD UPDATES: If you use the mod update function than the bot will detect when mod update is available and post information about the MOD
	to your desired discord channel.

	If you accidently close your bot monitor than just run the ASA_Server_Controller_Start.bat again, If server is running this will not
    do anything to server it will just restart the discord bot.
	
EXTRA FEATURES
    Bot status displays how many players are connected to server vs max player slots available.

    Discord users can run slash command in discord to see a list of currently connected players.

    Designate a channel for game chat. The Bot will display any in game chat that is sent in global channel to this channel.
    Discord users can chat with players in game thru this channel without being in game.
	
	Discord users can run slash command in discord to get information about the server such as on or offline, rank, lis of mods, ect.
	
	player conned or disconnected messages in game and or to discord when they join or leave the server.
	
	Pretty much all features can be customized to your liking as far as turning them on or off in the config file found in the bots config folder inside the default.json file.

Change Notes:
	12/20/23 Added slash command for admin channel to put in any rcon command and run it from the bot to server.

  	12/30/23 Bot crash fixes for get chat and player count display.

   	01/01/24 Fixed start command not starting server.
	
	01/27/2024 Complete rework/overhaul built in monitoring and rcon ability.
   
	01/28/2024 Fixed daily restart being off by 1 hour

	01/31/2024 Fixed daily restart broken from last update
	
	02/05/2024 Major update requires all files to be replaced and new settings to be set.
			   No more slash commands to control server it is all done by buttons (suggest setting up specific admin channel desiganted for this).
			   Auto detect mod updates, post info about them to discord, and trigger restart to update mod.
	
	02/08/2024 fixed console log error with chat messages and changed button color of restart with warnings button.	

	02/14/2024 Major rework to handle multiple bots for controlling multiple servers
	
	02/15/2024 fixed mod updates posting infinate times and never restarting for update

	02/19/2024 Changed discord chat to game into format easier on eyes this involved adding 2 new config options.

	02/20/2024 Fixed rcon not working for API shop and permissions commands
	
	02/24/2024 Rework to mod updates added change notes to the mod update post. Fixed issue where server restarting would loop multiple times.
	
	2/25/2024 Added new / slash command for server info. This requires config setting change. In config  set "Battle_Metrics_Token": to your battlemetrics token
			  or set it to "" empty quotes. empty quotes will disable the function. If you want a token you can get a free token from https://www.battlemetrics.com/developers
			  make sure to set the "Battle_Metrics_ServerID": for your servers in the config as well, if your using this function. see example config for details.
			  This command can be used by anyone to get server information/status.

	3/9/2024 Added slash command for use in admin channel to get player information about a player. 
			 Info obtained such as player and character names, player ID, EosID, and more.
			 also added new config setting to dissable the player list that discord memebers can run to see who is online.
			 
	3/24/2024 fixed issued with mod updates, switched some slash commands to buttons for admins, fixed bug with button population on bot start.
###########################	INSTALLATION INSTRUCTIONS	########################################

PART 1:	Nodejs Installation

	note:	Nodejs is required for the bot to function.
			You do not need to check the box for necessary tools and chocolatey during the installation process
		
	1. 	Download and install nodejs (version recommended for most users) to the machine your ASA Server is running on.
		nodejs link https://nodejs.org/en
	
PART 2: Setup your discord bot (each server you want to control from discord needs its own bot, this installation can handle multiple bots)
	
	1. 	Navigate to discord developers site and log in with your discord login credentials
		discord developers site https://discord.com/developers
		
	2.	Find and select "Applications" ("Applications" should be located on left side of screen).
	
	3.	On the upper right side of screen you should find "New Application" Button click on it.
	
	4. 	Now you should be looking at "CREATE AN APPLICATION" box. make a name for application (Example: ASA Island).
	
	5.	Check the box to agree to terms then click create.
	
	6.	You should have been sent to General Information about your bot. Only thing here you might want to do is set a
		picture for your bot in the app icon portion of the page.
		
	7.	At this point you should see on left side of screen a tab called Bot, click on it.
	
	8.	On this page scroll down until you find Public Bot and turn it off.
	
	9.	Scroll down a little farther and find Privileged Gateway Intents.
	
	10. Here you need to turn on Presence Intent, Server Members Intent, and Message Content Intent.
	
	11. Now click on the green save changes button to save all of your changes so far and stay on the page.
	
PART 3: Invite your bot to your discord server
	
	1. 	On the left side of the page you should see a tab called OAuth2, click on it.
	
	2.	Under the tab you just clicked on should now show General and URL Generator, select URL Generator.
	
	3.	In the Scopes section left column find and check the box called Bot.
	
	4.	Still in the Scopes section on the right side this time find and check the box called applications.commands
	
	5.	Scroll down to the Bot Permissions section and check the box called Administrator.
	
	6.	Scroll to bottom of the page and you should now see Generated URL section, click on the copy button.
		
		note: Do not close this page we are not done here, we will be back to it.
		
	7. 	Now open a new web browser or a new web browser tab and paste in what you just copied to the adress bar and press enter.
	
	8.	You should now have a drop down on this page where you will find your discord server in the dropdown box
		select the server you want the bot to be invited to and click continue then click Authorize and
		verify that you are human. Bot should now be on your discord and will show that it is offline.
		
Part 4:	File setup for your bot
	
	note:	You will need a way to unzip a zip folder and you will need a text editor like notepad or notepad++
			these files need to be put on the same machine as the Ark Survival Ascended Server.
			
	1. 	If you have not done so yet you will need to download the files from github.
	
	2. 	find the downloaded zip file and unzip it. Make sure that the files end up in a folder called, ASA_Server_Control_Bot
		if they do not than you will need to make this folder and put them into it.
		
		note:	file structure should be: ASA_Server_Control_Bot folder and in this folder should be 
				node_modules folder, rcon folder, src folder, ASA_Server_Controller_Start.bat File
				ASAPic.jpg file, package.json file, package-lock.json file, and README.md file.
				
	3. 	Place the ASA_Server_Control_Bot folder where ever you would like.
	
	4.	Go into ASA_Server_Control_Bot folder and find the config folder and inside the config is the default.json
		edit this file with a text editor. In the example_config.txt you will find helpful information on how to setup the default.json File
		the example_config also shows a 2 server setup and if you want more servers just follow the example config adding another server.
	
	5.	In the example_config are instructions read them they will guide your with putting in correct info.
 		in the default config file we need bot tokens for each of our bots for each server. Go back to the bot page I said we would come back to
		on the discord developers portal.

  	6. 	On the left side of the page select the Bot tab, on this page you should find you bots icon picture
		and next to it you should see Reset Token button, click on this button.
		
	7.	Yes you want to reset bots token, once reset there should be a copy button to copy the token.
		press this and paste the token in the Bot_Token area of our default.json file.
		
		note: 	Your bot token should be kept safe and not shared with anyone. If it gets compromised you can Reset
				your bot token but will need to update it in you default.json file for the bot.
				
	8.	Next we need the ID's for our Discord Server, Bot, and Discord Channels. So to get these we need to make sure
		developer mode is on for us in discord. Go to discord and find User Settings usually located bottom left corner
		near your personal icon and click it.
		
	9.	On the left side of User Settings scroll down until you find Advanced and click this, you should now see at the 
		top Developer Mode. Turn this on.
		
	10. Go back to your discord server and at the top left is your servers name, Right click on this and you should Now
		have Copy Server ID as the last option in the dropdown. If you do not see Copy Server ID than you did not turn on
		Developer Mode.
		
	11. Go back to default.json file and paste in the ID to correct location. Do this for all the ID's you need.
		Find the bot in the player list right click and copy ID, right click on channels and click copy ID.
				
	12. If you have made it this far Congratulations you should be ready to start your bot by double clicking on
		ASA_Server_Controller_Start.bat found in ASA_Server_Control_Bot folder. You should than be able to go to your
		discord and see your bot online now.
		
		If you have set everything up correctly than ASA_Server_Controller_Start.bat will do it all for you. It will start
		your server and your bot. It will auto update each restart and anytime the server is manually restarted.
		If for some reason your bot goes offline just start the ASA_Server_Controller_Start.bat again. You can run this File
		while server is running and it will not mess with the server while it is running.
