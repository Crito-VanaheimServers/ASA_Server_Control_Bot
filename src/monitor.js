const config = require('config');
const { EmbedBuilder } = require('discord.js');
const serverStatus = require("./server-status.js");
const buttonsInfo = require("./buttons-info.js");
const updateServer = require("./update-server.js");
const timeCheck = require("./time-check.js");
const gameWarning = require("./server-warnings.js");
const reBoot = require("./re-boot.js");
const restartTimeConv = require("./restart-timeconv.js");
const modCollect = require("./mod-collect.js");

module.exports = async function monitor(clients) {

    var restartTime = config.get(`ControlBot.Restart_Hour`);
    restartTimeConv(function (response) {
        restartTime = response;
    });

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    while (true) {
        for (let i = 0; i < clients.length; i++) {
            if (config.get(`ControlBot.Server_Control`)) {
                try {
                    let result = await serverStatus(clients[i]);
                    if (`${result}`.includes("Online")) {
                        if (!clients[i][6][0]) {
                            console.log(`${result}`);
                            clients[i][6][0] = true;
                            clients[i][6][1] = false;

                            let client = clients[i][0];
                            let server = clients[i][1];
                            let message = (`${result}`);
                            let serveronline = new EmbedBuilder()
                                .setTitle(config.get(`Servers.${server}.Game_Server_Name`))
                                .addFields({ name: (`Sever Status`), value: (`${message}`) })
                                .setColor(0x00e8ff)
                            client.channels.cache.get((config.get(`Servers.${server}.Admin_Channel_ID`))).send({ embeds: [serveronline] });
                            await buttonsInfo(clients);
                        }
                        let timeResult = await timeCheck();
                        if (`${timeResult}` === `${restartTime}`) {
                            if (clients[i][2] === false) {
                                clients[i][2] = true;
                                console.log(`Executing Daily Restart Warnings`);
                                gameWarning([clients[i], "DAILY RESTART", clients]);
                            }
                        }
                    } else {
                        if (clients[i][2] === false) {
                            if (!clients[i][6][1]) {
                                console.log(`${result}`);
                                clients[i][6][1] = true;
                                clients[i][6][0] = false;
                                let client = clients[i][0];
                                let server = clients[i][1];
                                let message = (`${result}`);
                                let serveroffline = new EmbedBuilder()
                                    .setTitle(config.get(`Servers.${server}.Game_Server_Name`))
                                    .addFields({ name: (`Sever Status`), value: (`${message}`) })
                                    .setColor(0xff0000)
                                client.channels.cache.get((config.get(`Servers.${server}.Admin_Channel_ID`))).send({ embeds: [serveroffline] });
                                await buttonsInfo(clients);
                            }
                            if (config.get(`ControlBot.Steam_Path`) !== "") {
                                clients[i][2] = true;
                                reBoot([clients[i], `${clients[i][0].user.tag}`]);
                                await updateServer([clients[i], `${clients[i][0].user.tag}`]);
                                let isOnline = await serverStatus(clients[i]);
                                while (!isOnline.includes("Online")) {
                                    await new Promise(resolve => setTimeout(resolve, 500));
                                    isOnline = await serverStatus(clients[i]);
                                }
                                
                                clients[i][2] = false;
                                clients[i][4][1] = false;
                                clients[i][4][0] = [];

                                if (config.get(`ControlBot.Curse_Forge_Token`) !== "") {
                                    modCollect();
                                }
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error:', error);
                }

                if (config.get(`ControlBot.Curse_Forge_Token`) !== "") {
                    if (config.get(`ControlBot.Mod_Updates_Restart`)) {
                        try {
                            if (clients[i][4][0].length !== 0) {
                                if (clients[i][2] === false) {
                                    let result = await serverStatus(clients[i]);
                                    if (`${result}`.includes("Online")) {
                                        clients[i][4][1] = true;
                                        clients[i][2] = true;
                                        console.log(`Mod updates ready for server, restarting ${config.get(`Servers.${clients[i][1]}.Game_Server_Name`)} server with warnings please wait...`);
                                        gameWarning([clients[i], "MOD UPDATE RESTART", clients]);
                                    }
                                }
                            }
                        } catch (error) {
                            console.error('Error:', error);
                        }
                    }
                }
            }
        }
        await sleep(3000);
    };
};