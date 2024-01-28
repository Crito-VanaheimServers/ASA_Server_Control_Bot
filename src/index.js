require('dotenv').config();
const BM = require('@leventhan/battlemetrics');
const Gamedig = require('gamedig');
const {Client, IntentsBitField, EmbedBuilder, ActivityType} = require ('discord.js');
const Rcon = require('rcon/node-rcon');

/*Battlemetrics
const options = {
    token: process.env.BMToken,
    serverID: process.env.BMServerID,
    game: 'arksa'
};
*/

var activeRestart = false;
var cancelRestart = false;

var rconoptions = {
    tcp: true,
    challenge: false
  };

function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
};

function gameWarning(warning){
try{
    (async function() {
      var warnMinutes = [300000,300000,60000,60000,60000,60000,60000];
      var totalMin = 0;
      for (let i = 0; i < warnMinutes.length; i++) {
          totalMin = warnMinutes[i]+totalMin;
      }
      
      for (let i = 0; i < warnMinutes.length; i++) {
          var totalMinConv = totalMin/60000;
          if(cancelRestart === false){
          var warnBroadcast = `Broadcast ****${warning} ${totalMinConv} MINUTES****`;
          var warnMessage = `ServerChat ****${warning} ${totalMinConv} MINUTES****`;
        }else{
            var warnBroadcast = `Broadcast ****${warning} CANCELLED****`;
            var warnMessage = `ServerChat ****${warning} CANCELLED****`;
            const rconCancelWarn = new EmbedBuilder()
            .setTitle(process.env.Message_Tittle)
            .addFields({name: `${warning}`, value: (`****${warning} CANCELLED****`)})
            .setColor(0x00e8ff)
            client.channels.cache.get((process.env.Admin_Channel_ID)).send({embeds: [rconCancelWarn]});
                rconCall(warnBroadcast,function(){
                    console.log(`${warnBroadcast}`);
                });
  
                await sleep(2000);
  
                rconCall(warnMessage,function(){
              console.log(`${warnMessage}`);
           });
            cancelRestart = false;
            activeRestart = false;
            return;
        }

          rconCall(warnBroadcast,function(){
              console.log(`${warnBroadcast}`);
          });

          await sleep(2000);

          rconCall(warnMessage,function(){
            console.log(`${warnMessage}`);
         });

          await sleep(warnMinutes[i]);
          totalMin = totalMin-warnMinutes[i];
      }
   

     rconCall(`"DoExit"`,function(data){
        (async function() {
        await sleep(30000);
        if(warning === "ADMIN FORCED RESTART"){
        updateServer(`${warning}`,function(response){
            if((`${response}`).includes("server is up to date")){
                startServer(`${warning}`,function(response){
                    if((`${response}`).includes("server was started")){
                        const rconRestartWarn = new EmbedBuilder()
                        .setTitle(process.env.Message_Tittle)
                        .addFields({name: `${warning}`, value: (`${process.env.Message_Tittle} server is now up to date\n${response}\nFinal bootup may take a few minutes before showing online`)})
                        .setColor(0x00e8ff)
                        client.channels.cache.get((process.env.Admin_Channel_ID)).send({embeds: [rconRestartWarn]});     
                    } 
                });
            }
        });
        }else{
            if(warning === "ADMIN FORCED SHUTDOWN"){
            var responseTrim = (`${data}`).trim();
            const rconShutdownWarn = new EmbedBuilder()
            .setTitle(process.env.Message_Tittle)
            .addFields({name: `${warning}`, value: (`${responseTrim}\n${process.env.Message_Tittle} shutdown successfully`)})
            .setColor(0x00e8ff)
            client.channels.cache.get((process.env.Admin_Channel_ID)).send({embeds: [rconShutdownWarn]});
            console.log(`${responseTrim}\n${process.env.Message_Tittle} shutdown successfully`);
            }else
            {
                if(warning === "DAILY RESTART"){
                    updateServer(`${warning}`,function(response){
                        if((`${response}`).includes("server is up to date")){
                            startServer(`${warning}`,function(response){
                                if((`${response}`).includes("server was started")){
                                    const rconDailyWarn = new EmbedBuilder()
                                    .setTitle(process.env.Message_Tittle)
                                    .addFields({name: `${warning}`, value: (`${process.env.Message_Tittle} server is now up to date\n${response}\nFinal bootup may take a few minutes before showing online`)})
                                    .setColor(0x00e8ff)
                                    client.channels.cache.get((process.env.Admin_Channel_ID)).send({embeds: [rconDailyWarn]});     
                                } 
                            });
                        }
                    });
                }
            }
        }
        })();
    });
})();
    } catch(error) {
        return
    }
};

function rconCall(rconCMD,callback){
    var conn = new Rcon((process.env.ASA_ServerIP),(process.env.ASA_rcon_port),(process.env.ASA_password),rconoptions);

    conn.on('auth', function() {
        conn.send(rconCMD);
    }).on('response', function(rconInfo) {
        conn.emit('end');
        return callback(rconInfo);
    }).on('error', function(err) {
        conn.emit('end');
    }).on('end', function() {
        conn.disconnect();
    });
    conn.connect();
};

function serverStatus(callback){
    try{
		var getServerStatus = require('child_process').spawn((process.env.Bot_Folder_Path) + ('/src/ServerCheck.bat'), [process.env.GameServerPath, process.env.Message_Tittle]);
	
		getServerStatus.stdout.on('data', function (data) {
            return callback(data);     
		});
		getServerStatus.stderr.on('err', function (err) {
			console.log("ERROR: Try restarting the bot");
		});
    } catch(error) {
        return
    }
}

function updateServer(senderName,callback){
    try{
    var updateserver = require('child_process').spawn((process.env.Bot_Folder_Path) + ('/src/UpdateServer.bat'), [process.env.GameServerPath, process.env.Message_Tittle, process.env.SteamPath]);
    
    updateserver.stdout.on('data', function (data) {
        console.log(`${data}`);
        return callback(data);
    });
    updateserver.stderr.on('err', function (err) {
        console.log("UPDATE ERROR: Try restarting the bot");
        const serverupdate = new EmbedBuilder()
        .setTitle(process.env.Message_Tittle)
        .addFields({name: senderName, value: `UPDATE ERROR: Try restarting the bot`})
        .setColor(0x00e8ff)
        client.channels.cache.get((process.env.Admin_Channel_ID)).send({embeds: [serverupdate]});
    });
    } catch(error) {
        return
    }
};

function startServer(senderName,callback){
    try{
    var serverstart = require('child_process').spawn((process.env.Bot_Folder_Path) + ('/src/ServerStart.bat'), [process.env.GameServerPath, process.env.Message_Tittle, process.env.EXELauncher, process.env.Command_Line]);
    
    serverstart.stdout.on('data', function (data) {
        console.log(`${data}`);
        activeRestart = false;
        return callback(data);
    });
    serverstart.stderr.on('err', function (err) {
        console.log("SERVER START ERROR: Try restarting the bot");
        const startserver = new EmbedBuilder()
            .setTitle(process.env.Message_Tittle)
            .addFields({name: senderName, value: `SERVER START ERROR: Try restarting the bot`})
            .setColor(0x00e8ff)
            client.channels.cache.get((process.env.Admin_Channel_ID)).send({embeds: [startserver]});
    });
    } catch(error) {
        return
    }
};

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`);

    serverStatus(function(response){
        if((`${response}`).includes("Online")){
            console.log(`${response}`);
        }else{
            if((`${response}`).includes("Offline")){
                console.log(`${response}`);
                const status = new EmbedBuilder()
                .setTitle(process.env.Message_Tittle)
                .addFields({name: (`${c.user.tag}`), value: (`${process.env.Message_Tittle} checking for updates please wait....`)})
                .setColor(0x00e8ff)
                client.channels.cache.get((process.env.Admin_Channel_ID)).send({embeds: [status]});
                updateServer(`${c.user.tag}`,function(response){
                    if((`${response}`).includes("server is up to date")){
                        startServer(`${c.user.tag}`,function(response){
                            if((`${response}`).includes("server was started")){
                                const startserver = new EmbedBuilder()
                                .setTitle(process.env.Message_Tittle)
                                .addFields({name: (`${c.user.tag}`), value: (`${process.env.Message_Tittle} server is now up to date\n${response}\nFinal bootup may take a few minutes before showing online`)})
                                .setColor(0x00e8ff)
                                client.channels.cache.get((process.env.Admin_Channel_ID)).send({embeds: [startserver]});     
                            } 
                        });
                    }
                });     
            }
        }
    });

setInterval(()=>{
                try {
                        Gamedig.query({
                        type: 'asa',
                        host: (process.env.Global_IP),
                        port: (process.env.Game_Port)
                      }).then((res) => {
                        var plyrCnt = res.raw.totalPlayers;
                        var maxSlots = res.maxplayers;
        
                        client.user.setPresence({ 
                        activities: [{ 
                                name:  (`Players ${plyrCnt}/${maxSlots}`),
                                type: ActivityType.Custom,  
                                }], 
                            status: 'online' 
                            });
                      }).catch((error) => {
                        client.user.setPresence({ 
                            activities: [{ 
                                    name:  (`Players 0/0`),
                                    type: ActivityType.Custom,  
                                    }], 
                                status: 'online' 
                                });
                      })
                    } catch(error) {
                        return
                    }

                    try {
                        rconCall("GetChat",function(response){
                            if((`${response}`).trim() === 'Server received, But no response!!'){
                                return
                            }else{
                                var chatTrim = (`${response}`).trim();
                                var chatSplit = chatTrim.split(/[\n]/);
                                for (let i = 0; i < chatSplit.length; i++) { 
                                    var PlyrChat = chatSplit[i];
                                    if(PlyrChat.includes("(From Discord)")){
                                        return
                                    }else{
                                        if(PlyrChat.includes("AdminCmd")){
                                            console.log(`${PlyrChat}`);
                                            return
                                        }else{
                                            const gameChatEmbed = new EmbedBuilder()
                                            .addFields({name: 'GAME CHAT:', value: (`${PlyrChat}`)})
                                            .setColor(0x00e8ff)
                                            client.channels.cache.get((process.env.Chat_Channel_ID)).send({embeds: [gameChatEmbed]});
                                            console.log(`${PlyrChat}`);
                                        } 
                                    }                   
                                 }
                            }
                        });
                    } catch(error) {
                        return
                    }

                try {
                        const now = new Date();
              
                        const hour = ("0" + now.getHours()).slice(-2);
                        const minute = ("0" + now.getMinutes()).slice(-2);
                        
                       
                        serverStatus(function(response){
                            if((`${response}`).includes("Online")){
                                if(`${hour}:${minute}` === `${(process.env.restartHour)}:45` && activeRestart === false){
                                    console.log(`Executing Daily Restart Warnings`);
                                    gameWarning("DAILY RESTART",function(){});
                                    activeRestart = true;
                                };
                                }else{
                                    if((`${response}`).includes("Offline") && activeRestart === false){
                                        activeRestart = true;
                                        const status = new EmbedBuilder()
                                        .setTitle(process.env.Message_Tittle)
                                        .addFields({name: (`${c.user.tag}`), value: (`Possible crash! starting ${process.env.Message_Tittle} server please wait ....`)})
                                        .setColor(0x00e8ff)
                                        client.channels.cache.get((process.env.Admin_Channel_ID)).send({embeds: [status]});
                                        console.log(`Possible crash! starting ${process.env.Message_Tittle} server please wait ....`);
                                        updateServer(`${c.user.tag}`,function(response){
                                            if((`${response}`).includes("server is up to date")){
                                                startServer(`${c.user.tag}`,function(response){
                                                    if((`${response}`).includes("server was started")){
                                                        const startserver = new EmbedBuilder()
                                                        .setTitle(process.env.Message_Tittle)
                                                        .addFields({name: (`${c.user.tag}`), value: (`${process.env.Message_Tittle} server is now up to date\n${response}\nFinal bootup may take a few minutes before showing online`)})
                                                        .setColor(0x00e8ff)
                                                        client.channels.cache.get((process.env.Admin_Channel_ID)).send({embeds: [startserver]});     
                                                    } 
                                                });
                                            }
                                        }); 
                                    }
                                }
                            });
                } catch(error) {
                    return
                }    
            },10000);
});

client.on('messageCreate', (chatMessage) => {
    if(chatMessage.channelId === (process.env.Chat_Channel_ID)){
        try {
            var message = (chatMessage.content);
            var sender = (chatMessage.author.globalName);
            var messageToSend = (`(From Discord) ${sender}: ${message}`);

            if (chatMessage.author.bot){
                return;
            }else{
                rconCall(`ServerChat ${messageToSend}`,function(){
                    console.log(`${messageToSend}`);
                });
            }
        } catch(error) {
            return
        }
    }
});

/*
client.on('messageCreate', (Message) => {
    var MessageSender = Message.author.username;
    if (MessageSender === (process.env.mod_Update_Bot)){
        require('child_process').exec('cmd /c start /min "" cmd /c' + (process.env.Bot_Folder_Path) + ('/rcon/modUpdateRestartWarn.bat') , function (){});
    };
});
*/

client.on('interactionCreate', (interaction) =>{
    if(!interaction.isChatInputCommand()) return;
   
    //ASA Island Server
    if (interaction.commandName === (process.env.Map_name)+'_server') {
        const asaislandcontroller = interaction.options.get('control').value;

        if(asaislandcontroller === 'start'){
        try{ 
            var commandSender = interaction.user.globalName;
                if(interaction.channelId === (process.env.Admin_Channel_ID)){ 
                serverStatus(function(response){
                    if((`${response}`).includes("Online")){ 
                        console.log(`SENDER: ${commandSender} | COMMAND: ${asaislandcontroller} | RESPONSE: ${process.env.Message_Tittle} server is already online`);
                        const sartcommand = new EmbedBuilder()
                        .setTitle(process.env.Message_Tittle)
                        .addFields({name: commandSender, value: (`${process.env.Message_Tittle} server is already online`)})
                        .setColor(0x00e8ff)
                        interaction.reply({embeds: [sartcommand]});
                    }else{
                        if((`${response}`).includes("Offline")){
                            console.log(`SENDER: ${commandSender} | COMMAND: ${asaislandcontroller} | RESPONSE: Checking for updates please wait....`);
                            const status = new EmbedBuilder()
                            .setTitle(process.env.Message_Tittle)
                            .addFields({name: (`${commandSender}`), value: (`Checking for updates please wait....`)})
                            .setColor(0x00e8ff)
                            interaction.reply({embeds: [status]});
                            updateServer(`${commandSender}`,function(response){
                                if((`${response}`).includes("server is up to date")){
                                    startServer(`${commandSender}`,function(response){
                                        if((`${response}`).includes("server was started")){
                                            const startserver = new EmbedBuilder()
                                            .setTitle(process.env.Message_Tittle)
                                            .addFields({name: (`${commandSender}`), value: (`${process.env.Message_Tittle} server is now up to date\n${response}\nFinal bootup may take a few minutes before showing online`)})
                                            .setColor(0x00e8ff)
                                            client.channels.cache.get((process.env.Admin_Channel_ID)).send({embeds: [startserver]});     
                                        } 
                                    });
                                }
                            });     
                        }
                    }
                });
            }else{
                    console.log(`SENDER: ${commandSender} | COMMAND: ${asaislandcontroller} | RESPONSE: You just tried to run an admin command outside of an admin channel!`);
                    const sartcommand = new EmbedBuilder()
                    .setTitle(process.env.Message_Tittle)
                    .addFields({name: 'ERROR:', value: 'You just tried to run an admin command outside of an admin channel!'})
                    .setColor(0xff0000)
                    interaction.reply({embeds: [sartcommand]});
            }
        } catch(error) {
            return
        }
    }
    
        if(asaislandcontroller === 'stop'){
            try{
            var commandSender = interaction.user.globalName;
            if(interaction.channelId === (process.env.Admin_Channel_ID)){
                    serverStatus(function(response){
                        if((`${response}`).includes("Online")){
                            if(activeRestart === false){  
                            console.log(`SENDER: ${commandSender} | COMMAND: ${asaislandcontroller} | RESPONSE: Sending shutdown signal to ${process.env.Message_Tittle} server...`);
                            const stopcommand = new EmbedBuilder()
                            .setTitle(process.env.Message_Tittle)
                            .addFields({name: commandSender, value: (`Sending shutdown signal to ${process.env.Message_Tittle} server...`)})
                            .setColor(0x00e8ff)
                            interaction.reply({embeds: [stopcommand]});
                            activeRestart = true;
                            rconCall(`"DoExit"`,function(response){
                                        if((`${response}`).trim() === 'Server received, But no response!!'){
                                            return
                                        }else{
                                            (async function() {
                                                await sleep(30000);
                                            var responseTrim = (`${response}`).trim();
                                            const serverstop = new EmbedBuilder()
                                            .setTitle(process.env.Message_Tittle)
                                            .addFields({name: commandSender, value: (`${responseTrim}\n${process.env.Message_Tittle} shutdown successfully`)})
                                            .setColor(0x00e8ff)
                                            client.channels.cache.get((process.env.Admin_Channel_ID)).send({embeds: [serverstop]});
                                            console.log(`${responseTrim}\n${process.env.Message_Tittle} shutdown successfully`);
                                            })();
                                        }
                            });
                        }else{
                            console.log(`SENDER: ${commandSender} | COMMAND: ${asaislandcontroller} | RESPONSE: Active restart/shutdown in progress`);
                            const serverstop = new EmbedBuilder()
                            .setTitle(process.env.Message_Tittle)
                            .addFields({name: `ERROR`, value: `Active restart/shutdown in progress`})
                            .setColor(0xff0000)
                            interaction.reply({embeds: [serverstop]});
                            }    
                        }else{
                            if((`${response}`).includes("Offline")){
                                console.log(`SENDER: ${commandSender} | COMMAND: ${asaislandcontroller} | RESPONSE: ${process.env.Message_Tittle} server is already offline`);
                                const status = new EmbedBuilder()
                                .setTitle(process.env.Message_Tittle)
                                .addFields({name: `ERROR`, value: (`${process.env.Message_Tittle} server is already offline`)})
                                .setColor(0xff0000)
                                interaction.reply({embeds: [status]});     
                            }
                        }
                    });
            }else{
                console.log(`SENDER: ${commandSender} | COMMAND: ${asaislandcontroller} | RESPONSE: You just tried to run an admin command outside of an admin channel!`);
                const stopcommand = new EmbedBuilder()
                .setTitle(process.env.Message_Tittle)
                .addFields({name: 'ERROR:', value: 'You just tried to run an admin command outside of an admin channel!'})
                .setColor(0xff0000)
                interaction.reply({embeds: [stopcommand]});
            }
        } catch(error) {
            return
        }
        }            

        if(asaislandcontroller === 'restart'){
            try{
                var commandSender = interaction.user.globalName;
                if(interaction.channelId === (process.env.Admin_Channel_ID)){
                        serverStatus(function(response){
                            if((`${response}`).includes("Online")){
                                if(activeRestart === false){ 
                                console.log(`SENDER: ${commandSender} | COMMAND: ${asaislandcontroller} | RESPONSE: Restarting ${process.env.Message_Tittle} server please wait...`);
                                const restartcommand = new EmbedBuilder()
                                .setTitle(process.env.Message_Tittle)
                                .addFields({name: commandSender, value: (`Restarting ${process.env.Message_Tittle} server please wait...`)})
                                .setColor(0x00e8ff)
                                interaction.reply({embeds: [restartcommand]});
                                activeRestart = true;        
                                rconCall(`"DoExit"`,function(response){
                                            if((`${response}`).trim() === 'Server received, But no response!!'){
                                                return
                                            }else{
                                                (async function() {
                                                    await sleep(30000);
                                                updateServer(`${commandSender}`,function(response){
                                                    if((`${response}`).includes("server is up to date")){
                                                        startServer(`${commandSender}`,function(response){
                                                            if((`${response}`).includes("server was started")){
                                                                const startserver = new EmbedBuilder()
                                                                .setTitle(process.env.Message_Tittle)
                                                                .addFields({name: (`${commandSender}`), value: (`${process.env.Message_Tittle} server is now up to date\n${response}\nFinal bootup may take a few minutes before showing online`)})
                                                                .setColor(0x00e8ff)
                                                                client.channels.cache.get((process.env.Admin_Channel_ID)).send({embeds: [startserver]});     
                                                            } 
                                                        });
                                                    }
                                                });
                                            })();
                                            }
                                        });
                                    }else{
                                        console.log(`SENDER: ${commandSender} | COMMAND: ${asaislandcontroller} | RESPONSE: Active restart/shutdown in progress`);
                                        const restartcommand = new EmbedBuilder()
                                        .setTitle(process.env.Message_Tittle)
                                        .addFields({name: `ERROR`, value: `Active restart/shutdown in progress`})
                                        .setColor(0xff0000)
                                        interaction.reply({embeds: [restartcommand]});
                                        }                      
                            }else{
                                if((`${response}`).includes("Offline")){
                                    console.log(`SENDER: ${commandSender} | COMMAND: ${asaislandcontroller} | RESPONSE: ${process.env.Message_Tittle} server is already offline, try starting the server`);
                                    const status = new EmbedBuilder()
                                    .setTitle(process.env.Message_Tittle)
                                    .addFields({name: `ERROR`, value: (`${process.env.Message_Tittle} server is already offline, try starting the server`)})
                                    .setColor(0xff0000)
                                    interaction.reply({embeds: [status]});     
                                }
                            }
                        })
                }else{
                    console.log(`SENDER: ${commandSender} | COMMAND: ${asaislandcontroller} | RESPONSE: You just tried to run an admin command outside of an admin channel!`);
                    const restartcommand = new EmbedBuilder()
                    .setTitle(process.env.Message_Tittle)
                    .addFields({name: 'ERROR:', value: 'You just tried to run an admin command outside of an admin channel!'})
                    .setColor(0xff0000)
                    interaction.reply({embeds: [restartcommand]});
                }
            } catch(error) {
                return
            }
            }

        if(asaislandcontroller === 'restart_warning'){
            try{
            var commandSender = interaction.user.globalName;
            if(interaction.channelId === (process.env.Admin_Channel_ID)){
                        serverStatus(function(response){
                        if((`${response}`).includes("Online")){
                            if (activeRestart === false){ 
                            console.log(`SENDER: ${commandSender} | COMMAND: ${asaislandcontroller} | RESPONSE: Restarting ${process.env.Message_Tittle} server with warnings please wait...`);
                            const restartwarning = new EmbedBuilder()
                                .setTitle(process.env.Message_Tittle)
                                .addFields({name: commandSender, value: `Restarting ${process.env.Message_Tittle} server with warnings please wait....`})
                                .setColor(0x00e8ff)
                                interaction.reply({embeds: [restartwarning]});
                                gameWarning("ADMIN FORCED RESTART",function(){});
                                activeRestart = true;
                            }else{
                                console.log(`SENDER: ${commandSender} | COMMAND: ${asaislandcontroller} | RESPONSE: Active restart/shutdown in progress`);
                                const restartwarning = new EmbedBuilder()
                                .setTitle(process.env.Message_Tittle)
                                .addFields({name: `ERROR`, value: `Active restart/shutdown in progress`})
                                .setColor(0xff0000)
                                interaction.reply({embeds: [restartwarning]});
                            }
                        }else{
                            if((`${response}`).includes("Offline")){
                                console.log(`SENDER: ${commandSender} | COMMAND: ${asaislandcontroller} | RESPONSE: ${process.env.Message_Tittle} server is already offline, try starting the server`);
                                const status = new EmbedBuilder()
                                .setTitle(process.env.Message_Tittle)
                                .addFields({name: `ERROR`, value: (`${process.env.Message_Tittle} server is already offline, try starting the server`)})
                                .setColor(0xff0000)
                                interaction.reply({embeds: [status]});     
                            }
                        }
                    })
                    
            }else{
                console.log(`SENDER: ${commandSender} | COMMAND: ${asaislandcontroller} | RESPONSE: You just tried to run an admin command outside of an admin channel!`);
                const restartwarning = new EmbedBuilder()
                .setTitle(process.env.Message_Tittle)
                .addFields({name: 'ERROR:', value: 'You just tried to run an admin command outside of an admin channel!'})
                .setColor(0xff0000)
                interaction.reply({embeds: [restartwarning]});
            }
        } catch(error) {
            return
        }
        }

        if(asaislandcontroller === 'stop_warning'){
            try{
                var commandSender = interaction.user.globalName;
            if(interaction.channelId === (process.env.Admin_Channel_ID)){
                    serverStatus(function(response){
                        if((`${response}`).includes("Online")){
                            if(activeRestart === false){
                                console.log(`SENDER: ${commandSender} | COMMAND: ${asaislandcontroller} | RESPONSE: Shutting down ${process.env.Message_Tittle} server with warnings please wait...`);
                                const shutdownwarning = new EmbedBuilder()
                                .setTitle(process.env.Message_Tittle)
                                .addFields({name: commandSender, value: `Shutting down ${process.env.Message_Tittle} server with warnings please wait....`})
                                .setColor(0x00e8ff)
                                interaction.reply({embeds: [shutdownwarning]});
                                activeRestart = true;
                                gameWarning("ADMIN FORCED SHUTDOWN",function(){});
                                }else{
                                console.log(`SENDER: ${commandSender} | COMMAND: ${asaislandcontroller} | RESPONSE: Active restart/shutdown in progress`);
                                const shutdownwarning = new EmbedBuilder()
                                .setTitle(process.env.Message_Tittle)
                                .addFields({name: `ERROR`, value: `Active restart/shutdown in progress`})
                                .setColor(0xff0000)
                                interaction.reply({embeds: [shutdownwarning]});
                                }
                        }else{
                            if((`${response}`).includes("Offline")){
                                console.log(`SENDER: ${commandSender} | COMMAND: ${asaislandcontroller} | RESPONSE: ${process.env.Message_Tittle} server is already offline, try starting the server`);
                                const status = new EmbedBuilder()
                                .setTitle(process.env.Message_Tittle)
                                .addFields({name: `ERROR`, value: (`${process.env.Message_Tittle} server is already offline, try starting the server`)})
                                .setColor(0xff0000)
                                interaction.reply({embeds: [status]});     
                            }
                        }
                    })
            }else{
                console.log(`SENDER: ${commandSender} | COMMAND: ${asaislandcontroller} | RESPONSE: You just tried to run an admin command outside of an admin channel!`);
                const restartwarning = new EmbedBuilder()
                .setTitle(process.env.Message_Tittle)
                .addFields({name: 'ERROR:', value: 'You just tried to run an admin command outside of an admin channel!'})
                .setColor(0xff0000)
                interaction.reply({embeds: [restartwarning]});
            }
        } catch(error) {
            return
        }
        }

        if(asaislandcontroller === 'cancel_warning'){
            try{
            var commandSender = interaction.user.globalName;
            if(interaction.channelId === (process.env.Admin_Channel_ID)){
                if(cancelRestart === false){
                    const cancelwarning = new EmbedBuilder()
                    .setTitle(process.env.Message_Tittle)
                    .addFields({name: commandSender, value: "Cancelling restart please wait..."})
                    .setColor(0x00e8ff)
                    interaction.reply({embeds: [cancelwarning]});
                    cancelRestart = true;
                    console.log(`SENDER: ${commandSender} | COMMAND: ${asaislandcontroller} | RESPONSE: Cancelling restart please wait...`);
                    }else{
                    const cancelwarning = new EmbedBuilder()
                    .setTitle(process.env.Message_Tittle)
                    .addFields({name: `ERROR`, value: "Active restart cancellation in progress"})
                    .setColor(0xff0000)
                    interaction.reply({embeds: [cancelwarning]});
                    console.log(`SENDER: ${commandSender} | COMMAND: ${asaislandcontroller} | RESPONSE: Active restart cancellation in progress`);
                    }
                }else{
                 console.log(`SENDER: ${commandSender} | COMMAND: ${asaislandcontroller} | RESPONSE: You just tried to run an admin command outside of an admin channel!`);
                 const cancelwarning = new EmbedBuilder()
                 .setTitle(process.env.Message_Tittle)
                 .addFields({name: 'ERROR:', value: 'You just tried to run an admin command outside of an admin channel!'})
                 .setColor(0xff0000)
                 interaction.reply({embeds: [cancelwarning]});
             }
            } catch(error) {
                return
            }
         }

        if(asaislandcontroller === 'dinowipe'){
           try{ 
            var commandSender = interaction.user.globalName;
            if(interaction.channelId === (process.env.Admin_Channel_ID)){
                const rcondinowipe = new EmbedBuilder()
                .setTitle(process.env.Message_Tittle)
                .addFields({name: commandSender, value: 'Destroying all wild dinos'})
                .setColor(0x00e8ff)
                interaction.reply({embeds: [rcondinowipe]});
                console.log(`SENDER: ${commandSender}\nCOMMAND: ${interaction.commandName}\nRESPONSE: Destroying all wild dinos`);
                rconCall(`"DestroyWildDinos"`,function(){});
            }else{
                console.log(`SENDER: ${commandSender} | COMMAND: ${asaislandcontroller} | RESPONSE: You just tried to run an admin command outside of an admin channel!`);
                const rcondinowipe = new EmbedBuilder()
                .setTitle(process.env.Message_Tittle)
                .addFields({name: 'ERROR:', value: 'You just tried to run an admin command outside of an admin channel!'})
                .setColor(0xff0000)
                interaction.reply({embeds: [rcondinowipe]});
            }
        } catch(error) {
            return
        }
        }
    }

    if (interaction.commandName === (process.env.Map_name)+'_rcon') {
        try{
            var rconCommand = interaction.options.get('rcon-command').value;
            var rconSender = interaction.user.globalName;
        if(interaction.channelId === (process.env.Admin_Channel_ID)){    
            rconCall(`"${rconCommand}"`,function(response){
                const rconEmbed = new EmbedBuilder()
                .setTitle(process.env.Message_Tittle)
                .addFields({name: `RCON Command Sender: ${rconSender}`, value: `RCON Command Recived: ${rconCommand}\n${response}`})
                .setColor(0x00e8ff)
                interaction.reply({embeds: [rconEmbed]});
                console.log(`RCON Command Sender: ${rconSender}\nRCON Command Recived: ${rconCommand}\nRCON Results:\n${response}`);
            });
        }else{
            const rconEmbed = new EmbedBuilder()
            .setTitle(process.env.Message_Tittle)
            .addFields({name: 'ERROR:', value: 'You just tried to run an admin command outside of an admin channel!'})
            .setColor(0xff0000)
            interaction.reply({embeds: [rconEmbed]});
            console.log(`RCON Command Sender: ${rconSender}\nRCON Command Recived: ${rconCommand}\n RCON Results: You just tried to run an admin command outside of an admin channel!`);
        }
        } catch(error) {
            return
        }  
    }

    if (interaction.commandName === (process.env.Map_name)+'_players') {
        try{
        var commandSender = interaction.user.globalName;
        if(interaction.channelId !== (process.env.Chat_Channel_ID)){
        rconCall(`"ListPlayers"`,function(response){
            var plyrTrim = response.trim();
            var plyrSplit = plyrTrim.split(/[,,\n]/);
            var newPlayerList = "";

            if(plyrSplit[0].trim() === 'No Players Connected'){
                const plListEmbed = new EmbedBuilder()
                .setTitle(process.env.Message_Tittle)
                .addFields({name: 'ONLINE PLAYERS:', value: ('No Players Connected')})
                .setColor(0xff0000)
                interaction.reply({embeds: [plListEmbed]});
                console.log(`SENDER: ${commandSender}\nCOMMAND: ${interaction.commandName}\nRESPONSE: No Players Connected`);
            }else{
                for (let i = 0; i < plyrSplit.length; i++) {
                    if(plyrSplit[i].length < 30){
                        let player = plyrSplit[i];
                        newPlayerList = newPlayerList + (`${player}\n`);                  
                    }
                }

            const plListEmbed = new EmbedBuilder()
            .setTitle(process.env.Message_Tittle)
            .addFields({name: 'ONLINE PLAYERS:', value: newPlayerList})
            .setColor(0x00e8ff)
            interaction.reply({embeds: [plListEmbed]});
            console.log(`SENDER: ${commandSender}\nCOMMAND: ${interaction.commandName}\nRESPONSE:\n${newPlayerList}`);
            }
        });
       
        }else{
            const plListEmbed = new EmbedBuilder()
            .setTitle(process.env.Message_Tittle)
            .addFields({name: 'ERROR:', value: 'You cant send player list to in game chat!'})
            .setColor(0xff0000)
            interaction.reply({embeds: [plListEmbed]});
            console.log(`SENDER: ${commandSender}\nCOMMAND: ${interaction.commandName}\nRESPONSE: You cant send player list to in game chat!`);
        }
    } catch(error) {
        return
    }
    }
});

client.login(process.env.TOKEN);