require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, ActivityType, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const serverStatus = require("./server-status.js");
const buttonsInfo = require("./buttons-info.js");
const updateServer = require("./update-server.js");
const modCollect = require("./mod-collect.js");
const playerCounts = require("./player-counts.js");
const gameChat = require("./game-chat.js");
const discordChat = require("./discord-chat.js");
const timeCheck = require("./time-check.js");
const restartTimeConv = require("./restart-timeconv.js");
const gameWarning = require("./server-warnings.js");
const reBoot = require("./re-boot.js");
const modCheck = require("./mod-check.js");
const rconCall = require("./rcon-call.js");
const cancelState = require("./cancel-state.js");
const restartState = require("./restart-state.js");

var restartTime = (process.env.restartHour);
restartTimeConv(function (response) {
    restartTime = response;
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

var activeRestart = restartState.getRestartState();
var cancelRestart = cancelState.getCancelState();

var modUpdate = false;

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

if ((process.env.Mod_Updates) === "true") {
    modCollect();
}

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`);

    if ((process.env.Server_Control) === "true") {
        buttonsInfo(client);
        serverStatus(function (result) {
            if ((`${result}`).includes("Online")) {
                console.log(`${result}`);
            } else {
                restartState.setRestartState(true);
                console.log(`${result}`);
                updateServer([client, `${c.user.tag}`], function (result) {
                    (async function () {
                        try {
                            await result;
                            restartState.setRestartState(false);
                            activeRestart = restartState.getRestartState();
                            modUpdate = false;
                        } catch (error) {
                            return
                        }
                    })();
                });
            }
        })
    }

    setInterval(() => {

        playerCounts(client);

        if ((process.env.Game_Chat) === "true") {
            gameChat(client);
        }

        if ((process.env.Server_Control) === "true") {
            serverStatus(function (response) {
                if ((`${response}`).includes("Online")) {
                    timeCheck(function (response) {
                        if (`${response}` === `${restartTime}`) {
                            activeRestart = restartState.getRestartState();
                            if (activeRestart === false) {
                                restartState.setRestartState(true);
                                activeRestart = restartState.getRestartState();
                                console.log(`Executing Daily Restart Warnings`);
                                gameWarning([client, "DAILY RESTART"]);
                            }
                        }
                    });
                } else {
                    if ((`${response}`).includes("Offline")) {
                        activeRestart = restartState.getRestartState();
                        if (activeRestart === false) {
                            restartState.setRestartState(true);
                            activeRestart = restartState.getRestartState();
                            reBoot([client, `${c.user.tag}`]);
                            updateServer([client, `${c.user.tag}`], function (result) {
                                (async function () {
                                    try {
                                        await result;
                                        restartState.setRestartState(false);
                                        activeRestart = restartState.getRestartState();
                                        modUpdate = false;
                                    } catch (error) {
                                        return
                                    }
                                })();
                            });
                        }
                    }
                }
            });
        }

        if (modUpdate === false) {
            modCheck(client, function (result) {
                modUpdate = result;
            });
        }

        if ((process.env.Server_Control) === "true") {
            activeRestart = restartState.getRestartState();
            if (modUpdate === true && activeRestart === false) {
                serverStatus(function (response) {
                    console.log(response);
                    if ((`${response}`).includes("Online")) {
                        restartState.setRestartState(true);
                        activeRestart = restartState.getRestartState();
                        console.log(`Mod updates ready for server, restarting ${process.env.Message_Tittle} server with warnings please wait...`);
                        gameWarning([client, "DAILY RESTART"]);
                    }
                })
            }
        }
    }, 10000);


    client.on('messageCreate', (chatMessage) => {
        if ((process.env.Discord_Chat) === "true") {
            if (chatMessage.channelId === (process.env.Chat_Channel_ID)) {
                discordChat(chatMessage);
            }
        }

        if (!chatMessage.author.bot) {
            if (chatMessage.channelId === (process.env.Admin_Channel_ID)) {
                try {
                    var rconSender = chatMessage.author.globalName;
                    rconCall(`"${chatMessage}"`, function (response) {
                        const rconEmbed = new EmbedBuilder()
                            .setTitle(process.env.Message_Tittle)
                            .addFields({ name: `RCON Command Sender: ${rconSender}`, value: `RCON Command Recived: ${chatMessage}\n${response}` })
                            .setColor(0x00e8ff)
                        client.channels.cache.get((process.env.Admin_Channel_ID)).send({ embeds: [rconEmbed] });
                        console.log(`RCON Command Sender: ${rconSender}\nRCON Command Recived: ${chatMessage}\nRCON Results:\n${response}`);
                        buttonsInfo(client);
                    });
                } catch (error) {
                    return
                }
            }
        }
    });

});

client.on('interactionCreate', (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === "start") {
            try {
                var commandSender = interaction.user.globalName;
                serverStatus(function (response) {
                    if ((`${response}`).includes("Online")) {
                        const sartcommand = new EmbedBuilder()
                            .setTitle(process.env.Message_Tittle)
                            .addFields({ name: commandSender, value: (`${process.env.Message_Tittle} server is already online`) })
                            .setColor(0x00e8ff)
                        interaction.reply({ embeds: [sartcommand] });
                        console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: ${process.env.Message_Tittle} server is already online`);
                        buttonsInfo(client);
                    } else {
                        if ((`${response}`).includes("Offline")) {
                            const sartcommand = new EmbedBuilder()
                                .setTitle(process.env.Message_Tittle)
                                .addFields({ name: commandSender, value: (`Starting ${process.env.Message_Tittle} server`) })
                                .setColor(0x00e8ff)
                            interaction.reply({ embeds: [sartcommand] });
                            console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Starting ${process.env.Message_Tittle} server`);
                            restartState.setRestartState(true);
                            activeRestart = restartState.getRestartState();
                            (async function () {
                                await sleep(2000);
                                updateServer([client, `${commandSender}`], function (result) {
                                    (async function () {
                                        try {
                                            await result;
                                            restartState.setRestartState(false);
                                            activeRestart = restartState.getRestartState();
                                            modUpdate = false;
                                        } catch (error) {
                                            return
                                        }
                                    })();
                                });
                            })();
                        }
                    }
                });
            } catch (error) {
                return
            }
        }

        if (interaction.customId === "stop") {
            try {
                var commandSender = interaction.user.globalName;
                serverStatus(function (response) {
                    if ((`${response}`).includes("Online")) {
                        activeRestart = restartState.getRestartState();
                        if (activeRestart === false) {
                            console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Sending shutdown signal to ${process.env.Message_Tittle} server, awaiting response...`);
                            const stopcommand = new EmbedBuilder()
                                .setTitle(process.env.Message_Tittle)
                                .addFields({ name: commandSender, value: (`Sending shutdown signal to ${process.env.Message_Tittle} server, awaiting response...`) })
                                .setColor(0x00e8ff)
                            interaction.reply({ embeds: [stopcommand] });
                            restartState.setRestartState(true);
                            activeRestart = restartState.getRestartState();
                            rconCall(`"DoExit"`, function (response) {
                                if ((`${response}`).trim() === 'Server received, But no response!!') {
                                    return
                                } else {
                                    (async function () {
                                        await sleep(2000);
                                        var responseTrim = (`${response}`).trim();
                                        const serverstop = new EmbedBuilder()
                                            .setTitle(process.env.Message_Tittle)
                                            .addFields({ name: commandSender, value: (`${responseTrim}\n${process.env.Message_Tittle} shutdown successfully`) })
                                            .setColor(0x00e8ff)
                                        client.channels.cache.get((process.env.Admin_Channel_ID)).send({ embeds: [serverstop] });
                                        console.log(`${responseTrim}\n${process.env.Message_Tittle} shutdown successfully`);
                                        buttonsInfo(client);
                                    })();
                                }
                            });
                        } else {
                            console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Active restart/shutdown in progress`);
                            const serverstop = new EmbedBuilder()
                                .setTitle(process.env.Message_Tittle)
                                .addFields({ name: `ERROR`, value: `Active restart/shutdown in progress` })
                                .setColor(0xff0000)
                            interaction.reply({ embeds: [serverstop] });
                        }
                    } else {
                        if ((`${response}`).includes("Offline")) {
                            console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: ${process.env.Message_Tittle} server is already offline`);
                            const status = new EmbedBuilder()
                                .setTitle(process.env.Message_Tittle)
                                .addFields({ name: `ERROR`, value: (`${process.env.Message_Tittle} server is already offline`) })
                                .setColor(0xff0000)
                            interaction.reply({ embeds: [status] });
                        }
                    }
                });
            } catch (error) {
                return
            }
        }

        if (interaction.customId === "restart") {
            try {
                var commandSender = interaction.user.globalName;
                serverStatus(function (response) {
                    if ((`${response}`).includes("Online")) {
                        activeRestart = restartState.getRestartState();
                        if (activeRestart === false) {
                            restartState.setRestartState(true);
                            activeRestart = restartState.getRestartState();
                            console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Restarting ${process.env.Message_Tittle} server please wait...`);
                            const restartcommand = new EmbedBuilder()
                                .setTitle(process.env.Message_Tittle)
                                .addFields({ name: commandSender, value: (`Restarting ${process.env.Message_Tittle} server please wait...`) })
                                .setColor(0x00e8ff)
                            interaction.reply({ embeds: [restartcommand] });

                            rconCall(`"DoExit"`, function (response) {
                                if ((`${response}`).trim() === 'Server received, But no response!!') {
                                    return
                                } else {
                                    (async function () {
                                        await sleep(2000);
                                        updateServer([client, `${commandSender}`], function (result) {
                                            (async function () {
                                                try {
                                                    await result;
                                                    restartState.setRestartState(false);
                                                    activeRestart = restartState.getRestartState();
                                                    modUpdate = false;
                                                } catch (error) {
                                                    return
                                                }
                                            })();
                                        });
                                    })();
                                }
                            });
                        } else {
                            console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Active restart/shutdown in progress`);
                            const restartcommand = new EmbedBuilder()
                                .setTitle(process.env.Message_Tittle)
                                .addFields({ name: `ERROR`, value: `Active restart/shutdown in progress` })
                                .setColor(0xff0000)
                            interaction.reply({ embeds: [restartcommand] });
                        }
                    } else {
                        if ((`${response}`).includes("Offline")) {
                            console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: ${process.env.Message_Tittle} server is already offline, try starting the server`);
                            const status = new EmbedBuilder()
                                .setTitle(process.env.Message_Tittle)
                                .addFields({ name: `ERROR`, value: (`${process.env.Message_Tittle} server is already offline, try starting the server`) })
                                .setColor(0xff0000)
                            interaction.reply({ embeds: [status] });
                        }
                    }
                })
            } catch (error) {
                return
            }
        }

        if (interaction.customId === "restartwarn") {
            try {
                var commandSender = interaction.user.globalName;
                serverStatus(function (response) {
                    if ((`${response}`).includes("Online")) {
                        activeRestart = restartState.getRestartState();
                        if (activeRestart === false) {
                            console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Restarting ${process.env.Message_Tittle} server with warnings please wait...`);
                            const restartwarning = new EmbedBuilder()
                                .setTitle(process.env.Message_Tittle)
                                .addFields({ name: commandSender, value: `Restarting ${process.env.Message_Tittle} server with warnings please wait....` })
                                .setColor(0x00e8ff)
                            interaction.reply({ embeds: [restartwarning] });
                            restartState.setRestartState(true);
                            activeRestart = restartState.getRestartState();
                            gameWarning([client, "ADMIN FORCED RESTART"]);
                        } else {
                            console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Active restart/shutdown in progress`);
                            const restartwarning = new EmbedBuilder()
                                .setTitle(process.env.Message_Tittle)
                                .addFields({ name: `ERROR`, value: `Active restart/shutdown in progress` })
                                .setColor(0xff0000)
                            interaction.reply({ embeds: [restartwarning] });
                        }
                    } else {
                        if ((`${response}`).includes("Offline")) {
                            console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: ${process.env.Message_Tittle} server is already offline, try starting the server`);
                            const status = new EmbedBuilder()
                                .setTitle(process.env.Message_Tittle)
                                .addFields({ name: `ERROR`, value: (`${process.env.Message_Tittle} server is already offline, try starting the server`) })
                                .setColor(0xff0000)
                            interaction.reply({ embeds: [status] });
                        }
                    }
                })
            } catch (error) {
                return
            }
        }

        if (interaction.customId === "stopwarn") {
            try {
                var commandSender = interaction.user.globalName;
                serverStatus(function (response) {
                    if ((`${response}`).includes("Online")) {
                        activeRestart = restartState.getRestartState();
                        if (activeRestart === false) {
                            console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Shutting down ${process.env.Message_Tittle} server with warnings please wait...`);
                            const shutdownwarning = new EmbedBuilder()
                                .setTitle(process.env.Message_Tittle)
                                .addFields({ name: commandSender, value: `Shutting down ${process.env.Message_Tittle} server with warnings please wait....` })
                                .setColor(0x00e8ff)
                            interaction.reply({ embeds: [shutdownwarning] });
                            restartState.setRestartState(true);
                            activeRestart = restartState.getRestartState();
                            gameWarning([client, "ADMIN FORCED SHUTDOWN"]);
                        } else {
                            console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Active restart/shutdown in progress`);
                            const shutdownwarning = new EmbedBuilder()
                                .setTitle(process.env.Message_Tittle)
                                .addFields({ name: `ERROR`, value: `Active restart/shutdown in progress` })
                                .setColor(0xff0000)
                            interaction.reply({ embeds: [shutdownwarning] });
                        }
                    } else {
                        if ((`${response}`).includes("Offline")) {
                            console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: ${process.env.Message_Tittle} server is already offline, try starting the server`);
                            const status = new EmbedBuilder()
                                .setTitle(process.env.Message_Tittle)
                                .addFields({ name: `ERROR`, value: (`${process.env.Message_Tittle} server is already offline, try starting the server`) })
                                .setColor(0xff0000)
                            interaction.reply({ embeds: [status] });
                        }
                    }
                })
            } catch (error) {
                return
            }
        }

        if (interaction.customId === "cancelwarn") {
            try {
                var commandSender = interaction.user.globalName;
                cancelRestart = cancelState.getCancelState();
                if (cancelRestart === false) {
                    if (modUpdate === false) {
                        const cancelwarning = new EmbedBuilder()
                            .setTitle(process.env.Message_Tittle)
                            .addFields({ name: commandSender, value: "Cancelling restart please wait..." })
                            .setColor(0x00e8ff)
                        interaction.reply({ embeds: [cancelwarning] });
                        cancelState.setCancelState(true);
                        console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Cancelling restart please wait...`);
                    } else {
                        const cancelwarning = new EmbedBuilder()
                            .setTitle(process.env.Message_Tittle)
                            .addFields({ name: `ERROR`, value: "Restart for mod updates can't be cancelled" })
                            .setColor(0xff0000)
                        interaction.reply({ embeds: [cancelwarning] });
                        console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Restart for mod updates can't be cancelled`);
                    }
                } else {
                    const cancelwarning = new EmbedBuilder()
                        .setTitle(process.env.Message_Tittle)
                        .addFields({ name: `ERROR`, value: "Active restart cancellation in progress" })
                        .setColor(0xff0000)
                    interaction.reply({ embeds: [cancelwarning] });
                    console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Active restart cancellation in progress`);
                }
            } catch (error) {
                return
            }
        }

        if (interaction.customId === "dinodestroy") {
            try {
                var commandSender = interaction.user.globalName;
                const rcondinowipe = new EmbedBuilder()
                    .setTitle(process.env.Message_Tittle)
                    .addFields({ name: commandSender, value: 'Destroying all wild dinos' })
                    .setColor(0x00e8ff)
                interaction.reply({ embeds: [rcondinowipe] });
                console.log(`SENDER: ${commandSender}\nCOMMAND: ${interaction.customId}\nRESPONSE: Destroying all wild dinos`);
                rconCall(`"DestroyWildDinos"`, function () { });
            } catch (error) {
                return
            }
        }
    }

    if (interaction.commandName === (process.env.Map_name) + '_players') {
        try {
            var commandSender = interaction.user.globalName;
            if (interaction.channelId !== (process.env.Chat_Channel_ID)) {
                rconCall(`"ListPlayers"`, function (response) {
                    var plyrTrim = response.trim();
                    var plyrSplit = plyrTrim.split(/[,,\n]/);
                    var newPlayerList = "";

                    if (plyrSplit[0].trim() === 'No Players Connected') {
                        const plListEmbed = new EmbedBuilder()
                            .setTitle(process.env.Message_Tittle)
                            .addFields({ name: 'ONLINE PLAYERS:', value: ('No Players Connected') })
                            .setColor(0xff0000)
                        interaction.reply({ embeds: [plListEmbed] });
                        console.log(`SENDER: ${commandSender}\nCOMMAND: ${interaction.commandName}\nRESPONSE: No Players Connected`);
                    } else {
                        for (let i = 0; i < plyrSplit.length; i++) {
                            if (plyrSplit[i].length < 30) {
                                let player = plyrSplit[i];
                                newPlayerList = newPlayerList + (`${player}\n`);
                            }
                        }

                        const plListEmbed = new EmbedBuilder()
                            .setTitle(process.env.Message_Tittle)
                            .addFields({ name: 'ONLINE PLAYERS:', value: newPlayerList })
                            .setColor(0x00e8ff)
                        interaction.reply({ embeds: [plListEmbed] });
                        console.log(`SENDER: ${commandSender}\nCOMMAND: ${interaction.commandName}\nRESPONSE:\n${newPlayerList}`);
                    }
                });

            } else {
                const plListEmbed = new EmbedBuilder()
                    .setTitle(process.env.Message_Tittle)
                    .addFields({ name: 'ERROR:', value: 'You cant send player list to in game chat!' })
                    .setColor(0xff0000)
                interaction.reply({ embeds: [plListEmbed] });
                console.log(`SENDER: ${commandSender}\nCOMMAND: ${interaction.commandName}\nRESPONSE: You cant send player list to in game chat!`);
            }
        } catch (error) {
            return
        }
    }
});
client.login(process.env.TOKEN);