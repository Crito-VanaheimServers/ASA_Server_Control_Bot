const config = require('config');
const { Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder } = require('discord.js');
const playerCounts = require("./player-counts.js");
const serverStatus = require("./server-status.js");
const buttonsInfo = require("./buttons-info.js");
const gameChat = require("./game-chat.js");
const discordChat = require("./discord-chat.js");
const gameWarning = require("./server-warnings.js");
const rconCall = require("./rcon-call.js");
const serverInfoBM = require("./get-infobm.js");
const plyrSaveInfo = require("./get_filedata.js");
const joinLeave = require("./join-leave.js");
const monitor = require("./monitor.js");
const registerComds = require("./register-commands.js");
const modCollect = require("./mod-collect.js");
const modTimeCheck = require("./mod-timecheck.js");
const modCheck = require("./mod-check.js");
const timeCheck = require("./time-check.js");

const clients = [];

var nextCheck = "";
(async function () { nextCheck = await modTimeCheck(); })();

function afterLogin() {
    if (config.get(`ControlBot.Curse_Forge_Token`) !== "") {
        modCollect();
    }

    monitor(clients);

    setInterval(() => {

        for (let i = 0; i < clients.length; i++) {

            playerCounts(clients[i]);

            if (config.get(`ControlBot.Game_Chat`)) {
                if (config.get(`Servers.${clients[i][1]}.Chat_Channel_ID`) !== "") {
                    gameChat(clients[i]);
                }
            }

            joinLeave(clients[i]);
        }

        (async function () {
            if (clients.every(client => client[4][1] !== true)) {
                if (config.get(`ControlBot.Mod_Channel`) !== "") {
                    let curTime = await timeCheck();
                    if (`${curTime}` === `${nextCheck}`) {
                        nextCheck = await modTimeCheck();
                        modCheck(clients);
                    }
                }
            }
        })();
    }, 3000);


    for (let i = 0; i < clients.length; i++) {
        clients[i][0].on('messageCreate', (chatMessage) => {
            if (config.get(`ControlBot.Discord_Chat`)) {
                if (config.get(`Servers.${clients[i][1]}.Chat_Channel_ID`) !== "") {
                    if (chatMessage.channelId === config.get(`Servers.${clients[i][1]}.Chat_Channel_ID`)) {
                        discordChat([clients[i], chatMessage]);
                    }
                }
            }
        });
    }

    for (let i = 0; i < clients.length; i++) {
        clients[i][0].on('interactionCreate', (interaction) => {
            var IDName = config.get(`Servers.${clients[i][1]}.Game_Server_Name`).toLowerCase().replace(/\s+/g, '_');
            if (interaction.isButton()) {
                if (interaction.customId === `${IDName}_start`) {
                    (async function () {
                        try {
                            var commandSender = interaction.user.globalName;
                            if (config.get(`ControlBot.Steam_Path`) !== "") {
                                const result = await serverStatus(clients[i]);
                                if (`${result}`.includes("Online")) {
                                    const sartcommand = new EmbedBuilder()
                                        .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                        .addFields({ name: commandSender, value: (`${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} server is already online`) })
                                        .setColor(0x00e8ff)
                                    interaction.reply({ embeds: [sartcommand] });
                                    console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: ${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} server is already online`);
                                    buttonsInfo(clients);
                                } else {
                                    const sartcommand = new EmbedBuilder()
                                        .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                        .addFields({ name: commandSender, value: (`Starting ${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} server`) })
                                        .setColor(0x00e8ff)
                                    interaction.reply({ embeds: [sartcommand] });
                                    console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Starting ${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} server`);
                                    clients[i][2] = false;
                                }
                            } else {
                                const sartcommand = new EmbedBuilder()
                                    .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                    .addFields({ name: commandSender, value: (`Rented servers can not be started remotely, this button is dissabled.`) })
                                    .setColor(0x00e8ff)
                                interaction.reply({ embeds: [sartcommand] });
                                console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Rented servers can not be started remotely, this button is dissabled.`);
                                buttonsInfo(clients);
                            }
                        } catch (error) {
                            return
                        }
                    })();
                }

                if (interaction.customId === `${IDName}_stop`) {
                    (async function () {
                        try {
                            var commandSender = interaction.user.globalName;
                            const result = await serverStatus(clients[i]);
                            if (`${result}`.includes("Online")) {
                                if (clients[i][2] === false) {
                                    console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Sending shutdown signal to ${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} server, awaiting response...`);
                                    const stopcommand = new EmbedBuilder()
                                        .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                        .addFields({ name: commandSender, value: (`Sending shutdown signal to ${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} server, awaiting response...`) })
                                        .setColor(0x00e8ff)
                                    interaction.reply({ embeds: [stopcommand] });
                                    if (config.get(`ControlBot.Steam_Path`) !== "") {
                                        clients[i][2] = true;
                                    }
                                    rconCall([clients[i], 'DoExit']);
                                    let status = await serverStatus(clients[i]);
                                    while (!status.includes("Offline")) {
                                        await new Promise(resolve => setTimeout(resolve, 3000));
                                        status = await serverStatus(clients[i]);
                                    }
                                    const serverstop = new EmbedBuilder()
                                        .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                        .addFields({ name: commandSender, value: (`${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} shutdown successfully`) })
                                        .setColor(0x00e8ff)
                                    await clients[i][0].channels.cache.get((config.get(`Servers.${clients[i][1]}.Admin_Channel_ID`))).send({ embeds: [serverstop] });
                                    console.log(`${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} shutdown successfully`);
                                    buttonsInfo(clients);
                                } else {
                                    console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Active restart/shutdown in progress`);
                                    const serverstop = new EmbedBuilder()
                                        .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                        .addFields({ name: `ERROR`, value: `Active restart/shutdown in progress` })
                                        .setColor(0xff0000)
                                    interaction.reply({ embeds: [serverstop] });
                                }
                            } else {
                                console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: ${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} server is already offline`);
                                const statusOff = new EmbedBuilder()
                                    .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                    .addFields({ name: `ERROR`, value: (`${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} server is already offline`) })
                                    .setColor(0xff0000)
                                interaction.reply({ embeds: [statusOff] });
                            }
                        } catch (error) {
                            return
                        }
                    })();
                }

                if (interaction.customId === `${IDName}_restart`) {
                    (async function () {
                        try {
                            var commandSender = interaction.user.globalName;
                            const result = await serverStatus(clients[i]);
                            if (`${result}`.includes("Online")) {
                                if (clients[i][2] === false) {
                                    console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Restarting ${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} server please wait...`);
                                    const restartcommand = new EmbedBuilder()
                                        .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                        .addFields({ name: commandSender, value: (`Restarting ${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} server please wait...`) })
                                        .setColor(0x00e8ff)
                                    interaction.reply({ embeds: [restartcommand] });
                                    if (config.get(`ControlBot.Steam_Path`) !== "") {
                                        await rconCall([clients[i], 'DoExit']);
                                    } else {
                                        rconCall([clients, 'DoRestartLevel']);
                                    }
                                } else {
                                    console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Active restart/shutdown in progress`);
                                    const restartcommand = new EmbedBuilder()
                                        .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                        .addFields({ name: `ERROR`, value: `Active restart/shutdown in progress` })
                                        .setColor(0xff0000)
                                    interaction.reply({ embeds: [restartcommand] });
                                    buttonsInfo(clients);
                                }
                            } else {
                                console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: ${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} server is already offline, try starting the server`);
                                const status = new EmbedBuilder()
                                    .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                    .addFields({ name: `ERROR`, value: (`${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} server is already offline, try starting the server`) })
                                    .setColor(0xff0000)
                                interaction.reply({ embeds: [status] });
                            }
                        } catch (error) {
                            return
                        }
                    })();
                }

                if (interaction.customId === `${IDName}_restartwarn`) {
                    (async function () {
                        try {
                            var commandSender = interaction.user.globalName;
                            const result = await serverStatus(clients[i]);
                            if (`${result}`.includes("Online")) {
                                if (clients[i][2] === false) {
                                    clients[i][2] = true;
                                    console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Restarting ${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} server with warnings please wait...`);
                                    const restartwarning = new EmbedBuilder()
                                        .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                        .addFields({ name: commandSender, value: `Restarting ${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} server with warnings please wait....` })
                                        .setColor(0x00e8ff)
                                    interaction.reply({ embeds: [restartwarning] });
                                    gameWarning([clients[i], "ADMIN FORCED RESTART", clients]);
                                } else {
                                    console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Active restart/shutdown in progress`);
                                    const restartwarning = new EmbedBuilder()
                                        .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                        .addFields({ name: `ERROR`, value: `Active restart/shutdown in progress` })
                                        .setColor(0xff0000)
                                    interaction.reply({ embeds: [restartwarning] });
                                    buttonsInfo(clients);
                                }
                            } else {
                                console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: ${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} server is already offline, try starting the server`);
                                const status = new EmbedBuilder()
                                    .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                    .addFields({ name: `ERROR`, value: (`${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} server is already offline, try starting the server`) })
                                    .setColor(0xff0000)
                                interaction.reply({ embeds: [status] });
                            }
                        } catch (error) {
                            return
                        }
                    })();
                }

                if (interaction.customId === `${IDName}_stopwarn`) {
                    (async function () {
                        try {
                            var commandSender = interaction.user.globalName;
                            const result = await serverStatus(clients[i]);
                            if (`${result}`.includes("Online")) {
                                if (clients[i][2] === false) {
                                    clients[i][2] = true;
                                    console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Shutting down ${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} server with warnings please wait...`);
                                    const shutdownwarning = new EmbedBuilder()
                                        .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                        .addFields({ name: commandSender, value: `Shutting down ${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} server with warnings please wait....` })
                                        .setColor(0x00e8ff)
                                    interaction.reply({ embeds: [shutdownwarning] });
                                    gameWarning([clients[i], "ADMIN FORCED SHUTDOWN", clients]);
                                } else {
                                    console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Active restart/shutdown in progress`);
                                    const shutdownwarning = new EmbedBuilder()
                                        .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                        .addFields({ name: `ERROR`, value: `Active restart/shutdown in progress` })
                                        .setColor(0xff0000)
                                    interaction.reply({ embeds: [shutdownwarning] });
                                    buttonsInfo(clients);
                                }
                            } else {
                                console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: ${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} server is already offline, try starting the server`);
                                const status = new EmbedBuilder()
                                    .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                    .addFields({ name: `ERROR`, value: (`${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} server is already offline, try starting the server`) })
                                    .setColor(0xff0000)
                                interaction.reply({ embeds: [status] });
                            }

                        } catch (error) {
                            return
                        }
                    })();
                }

                if (interaction.customId === `${IDName}_cancelwarn`) {
                    (async function () {
                        try {
                            var commandSender = interaction.user.globalName;
                            if (clients[i][3] === false) {
                                if (clients[i][4][0].length === 0) {
                                    const cancelwarning = new EmbedBuilder()
                                        .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                        .addFields({ name: commandSender, value: "Cancelling restart please wait..." })
                                        .setColor(0x00e8ff)
                                    interaction.reply({ embeds: [cancelwarning] });
                                    clients[i][3] = true;
                                    console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Cancelling restart please wait...`);
                                } else {
                                    const cancelwarning = new EmbedBuilder()
                                        .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                        .addFields({ name: `ERROR`, value: "Restart for mod updates can't be cancelled" })
                                        .setColor(0xff0000)
                                    interaction.reply({ embeds: [cancelwarning] });
                                    console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Restart for mod updates can't be cancelled`);
                                    buttonsInfo(clients);
                                }
                            } else {
                                const cancelwarning = new EmbedBuilder()
                                    .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                    .addFields({ name: `ERROR`, value: "Active restart cancellation in progress" })
                                    .setColor(0xff0000)
                                interaction.reply({ embeds: [cancelwarning] });
                                console.log(`SENDER: ${commandSender} | COMMAND: ${interaction.customId} | RESPONSE: Active restart cancellation in progress`);
                            }
                        } catch (error) {
                            return
                        }
                    })();
                }

                if (interaction.customId === `${IDName}_dinodestroy`) {
                    (async function () {
                        try {
                            var commandSender = interaction.user.globalName;
                            const rcondinowipe = new EmbedBuilder()
                                .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                .addFields({ name: commandSender, value: 'Destroying all wild dinos' })
                                .setColor(0x00e8ff)
                            interaction.reply({ embeds: [rcondinowipe] });
                            console.log(`SENDER: ${commandSender}\nCOMMAND: ${interaction.customId}\nRESPONSE: Destroying all wild dinos`);
                            await rconCall([clients[i], 'DestroyWildDinos']);
                            buttonsInfo(clients);
                        } catch (error) {
                            return
                        }
                    })();
                }

                if (interaction.customId === `${IDName}_player_list`) {
                    (async function () {
                        try {
                            var commandSender = interaction.user.globalName;
                            var listPlyrs = await rconCall([clients[i], 'ListPlayers']);
                            const playerList = new EmbedBuilder()
                                .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                .addFields({ name: commandSender, value: '```' + `${listPlyrs}` + '```' })
                                .setColor(0x00e8ff)
                            interaction.reply({ embeds: [playerList] });
                            console.log(`SENDER: ${commandSender}\nCOMMAND: ${interaction.customId}\nRESPONSE: ${listPlyrs}`);
                            buttonsInfo(clients);
                        } catch (error) {
                            return
                        }
                    })();
                }

                if (interaction.customId === `${IDName}_rcon_modal`) {
                    (async function () {
                        try {
                            const rconModal = new ModalBuilder()
                                .setCustomId(`${IDName}_rcon`)
                                .setTitle(`RCON: ${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} server`);

                            const rconTextInput = new TextInputBuilder()
                                .setCustomId(`${IDName}_rcon_command`)
                                .setLabel(`Enter Command (plain text, no quotes)`)
                                .setStyle("Short")
                                .setMinLength(1)
                                .setMaxLength(4000)
                                .setPlaceholder("ListPlayers")
                                .setRequired(true);

                            const actionRow = new ActionRowBuilder()
                                .addComponents(rconTextInput);

                            rconModal.addComponents(actionRow);

                            await interaction.showModal(rconModal);
                        } catch (error) {
                            console.log(error);
                        }
                    })();
                }

                if (interaction.customId === `${IDName}_player_modal`) {
                    (async function () {
                        try {
                            const playerModal = new ModalBuilder()
                                .setCustomId(`${IDName}_player_info`)
                                .setTitle(`Player Info: ${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} server`);

                            const rconTextInput = new TextInputBuilder()
                                .setCustomId(`${IDName}_player`)
                                .setLabel(`Enter player name (not character name)`)
                                .setStyle("Short")
                                .setMinLength(1)
                                .setMaxLength(4000)
                                .setPlaceholder("Bob")
                                .setRequired(true);

                            const actionRow = new ActionRowBuilder()
                                .addComponents(rconTextInput);

                            playerModal.addComponents(actionRow);

                            await interaction.showModal(playerModal);
                        } catch (error) {
                            console.log(error);
                        }
                    })();
                }
            }

            if (interaction.commandName === `${IDName}_players`) {
                (async function () {
                    try {
                        var commandSender = interaction.user.globalName;
                        if (interaction.channelId !== (config.get(`Servers.${clients[i][1]}.Chat_Channel_ID`))) {
                            const response = await rconCall([clients[i], 'ListPlayers']);
                            var plyrTrim = response.trim();
                            var plyrSplit = plyrTrim.split(/[,,\n]/);
                            var newPlayerList = "";

                            if (plyrSplit[0].trim() === 'No Players Connected') {
                                const plListEmbed = new EmbedBuilder()
                                    .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
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
                                    .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                    .addFields({ name: 'ONLINE PLAYERS:', value: newPlayerList })
                                    .setColor(0x00e8ff)
                                interaction.reply({ embeds: [plListEmbed] });
                                console.log(`SENDER: ${commandSender}\nCOMMAND: ${interaction.commandName}\nRESPONSE:\n${newPlayerList}`);
                            }
                        } else {
                            const plListEmbed = new EmbedBuilder()
                                .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                .addFields({ name: 'ERROR:', value: 'You cant send player list to in game chat!' })
                                .setColor(0xff0000)
                            interaction.reply({ embeds: [plListEmbed] });
                            console.log(`SENDER: ${commandSender}\nCOMMAND: ${interaction.commandName}\nRESPONSE: You cant send player list to in game chat!`);
                        }
                    } catch (error) {
                        return
                    }
                })();
            }

            if (interaction.customId === `${IDName}_player_info`) {
                (async function () {
                    try {
                        if (config.get(`Servers.${clients[i][1]}.Saves_Path`) !== "") {
                            if (!interaction.isModalSubmit()) return;

                            var trgtName = interaction.fields.getTextInputValue(`${IDName}_player`);
                            var sender = interaction.user.globalName;
                            const response = await plyrSaveInfo([clients[i], trgtName]);
                            const pInfoEmbed = new EmbedBuilder()
                                .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                .addFields({ name: `Player info for ${trgtName} requested by ${sender}`, value: `${response}` })
                                .setColor(0x00e8ff)
                            interaction.reply({ embeds: [pInfoEmbed] });
                            console.log(`Player info for ${trgtName} requested by ${sender} \n ${response}`);
                            buttonsInfo(clients);
                        } else {
                            const pInfoEmbed = new EmbedBuilder()
                                .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                .addFields({ name: 'ERROR:', value: 'Function disabled' })
                                .setColor(0xff0000)
                            interaction.reply({ embeds: [pInfoEmbed] });
                            console.log(`Player info for ${trgtName} requested by: ${sender}\nResults: Function disabled`);
                        }
                    } catch (error) {
                        return
                    }
                })();
            }

            if (interaction.commandName === `${IDName}_server_info`) {
                var commandSender = interaction.user.globalName;
                (async function () {
                    try {
                        if (interaction.channelId !== (config.get(`Servers.${clients[i][1]}.Chat_Channel_ID`))) {
                            const BMInfo = await serverInfoBM(clients[i]);
                            const modLinks = BMInfo.attributes.details.modLinks;
                            const modNames = BMInfo.attributes.details.modNames;
                            const modIds = BMInfo.attributes.details.modIds;

                            let BMInfoEmbed = new EmbedBuilder()
                                .setTitle(BMInfo.attributes.name)
                                .setColor(0x00e8ff)
                                .addFields({ name: 'STATUS', value: '`' + `${BMInfo.attributes.status}` + '`' })
                                .addFields({ name: 'SERVER IP & PORT', value: '`' + `${BMInfo.attributes.ip}:${BMInfo.attributes.port}` + '`' })
                                .addFields({ name: 'DATE CREATED', value: '`' + `${BMInfo.attributes.createdAt.substring(5, 7)}-${BMInfo.attributes.createdAt.substring(8, 10)}-${BMInfo.attributes.createdAt.substring(0, 4)}` + '`' })
                                .addFields({ name: 'COUNTRY', value: '`' + `${BMInfo.attributes.country}` + '`' })
                                .addFields({ name: 'RANK', value: '`' + `${BMInfo.attributes.rank}` + '`' })
                                .addFields({ name: 'PLAYER COUNT', value: '`' + `${BMInfo.attributes.players}/${BMInfo.attributes.maxPlayers}` + '`' })
                                .addFields({ name: 'MAP', value: '`' + `${BMInfo.attributes.details.map}` + '`' })
                                .addFields({ name: 'VERSION', value: '`' + `${BMInfo.attributes.details.version}` + '`' })
                                .addFields({ name: 'PVE', value: '`' + `${BMInfo.attributes.details.pve}` + '`' })
                                .addFields({ name: 'CROSSPLAY', value: '`' + `${BMInfo.attributes.details.crossplay}` + '`' })
                            let embeds = [];

                            for (let i = 0; i < modLinks.length; i++) {
                                const modName = modNames[i] || 'Unknown';
                                const modId = modIds[i] || 'Unknown';

                                BMInfoEmbed.addFields({
                                    name: `MOD ${i + 1}`,
                                    value: `[${modName}](${modLinks[i]})` + '`' + `- ID:` + `${modId}` + '`',
                                    inline: true
                                });

                                if ((i + 1) % 15 === 0 || i === modLinks.length - 1) {
                                    embeds.push(BMInfoEmbed);
                                    if (i !== modLinks.length - 1) {
                                        BMInfoEmbed = new EmbedBuilder()
                                            .setColor(0x00e8ff);
                                    }
                                }
                            }

                            await interaction.reply({ embeds: embeds });

                            console.log(`SENDER: ${commandSender}\nCOMMAND: ${interaction.commandName}`);
                        } else {
                            const plListEmbed = new EmbedBuilder()
                                .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                                .addFields({ name: 'ERROR:', value: 'You cant send player list to in game chat!' })
                                .setColor(0xff0000)
                            interaction.reply({ embeds: [plListEmbed] });
                            console.log(`SENDER: ${commandSender}\nCOMMAND: ${interaction.commandName}\nRESPONSE: You cant send player list to in game chat!`);
                        }
                    } catch (error) {
                        console.error('Error retrieving server information:', error);
                        return;
                    }
                })();
            }


            if (interaction.customId === `${IDName}_rcon`) {
                (async function () {
                    try {
                        if (!interaction.isModalSubmit()) return;
                        var rconSender = interaction.user.globalName;
                        var rconCommand = interaction.fields.getTextInputValue(`${IDName}_rcon_command`);

                        const response = await rconCall([clients[i], rconCommand]);
                        const rconEmbed = new EmbedBuilder()
                            .setTitle(config.get(`Servers.${clients[i][1]}.Game_Server_Name`))
                            .addFields({ name: `RCON Command Sender: ${rconSender}`, value: `RCON Command Recived: ${rconCommand}\n` + '```' + `${response}` + '```' })
                            .setColor(0x00e8ff)
                        interaction.reply({ embeds: [rconEmbed] });
                        console.log(`RCON Command Sender: ${rconSender}\nRCON Command Recived: ${rconCommand}\nRCON Results:\n${response}`);
                        buttonsInfo(clients);
                    } catch (error) {
                        console.log(error);
                    }
                })();
            }
        });
    }
};

async function createAndLoginClients() {
    const servers = config.get('Servers');

    for (const serverKey in servers) {
        const server = servers[serverKey];
        const client = new Client({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMembers,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.MessageContent,
            ],
        });

        client.on('ready', () => {
            console.log(`${client.user.tag} Discord Bot Online.`);
            clients.push([client, serverKey, false, false, [[], false], [[], true], [false, false]]);
            if (clients.length === Object.keys(servers).length) {
                afterLogin();
            }
        });


        try {
            await client.login(server.Bot_Token);
        } catch (error) {
            console.error(`Error logging in client for server ${serverKey}:`, error);
        }
    }
}

registerComds()
createAndLoginClients()

//client = clients[i][0];
//server = clients[i][1];
//activeRestart = clients[i][2];
//cancelRestart = clients[i][3];
//modUpdate = clients[i][4];
//newPlayerList = clients[i][5][0]; //join-leave.js playerList change toggle = clients[i][5][1];
//online/offline toggle = clients[i][6];

