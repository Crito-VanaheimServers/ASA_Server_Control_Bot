require('dotenv').config();
const { EmbedBuilder } = require('discord.js');
const rconCall = require("./rcon-call");
const cancelState = require("./cancel-state");
const restartState = require("./restart-state.js");
const buttonsInfo = require("./buttons-info.js");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = (gameWarning);

function gameWarning([client,warning]) {
    try {
        (async function () {
            var warnMinutes = [60000, 60000];//[300000, 300000, 60000, 60000, 60000, 60000, 60000];
            var totalMin = 0;
            for (let i = 0; i < warnMinutes.length; i++) {
                totalMin = warnMinutes[i] + totalMin;
            }

            for (let i = 0; i < warnMinutes.length; i++) {
                var totalMinConv = totalMin / 60000;
                var cancelRestart = cancelState.getCancelState();
                if (cancelRestart === false) {
                    var warnBroadcast = `Broadcast ****${warning} ${totalMinConv} MINUTES****`;
                    var warnMessage = `ServerChat ****${warning} ${totalMinConv} MINUTES****`;
                } else {
                    var warnBroadcast = `Broadcast ****${warning} CANCELLED****`;
                    var warnMessage = `ServerChat ****${warning} CANCELLED****`;
                    const rconCancelWarn = new EmbedBuilder()
                        .setTitle(process.env.Message_Tittle)
                        .addFields({ name: `${warning}`, value: (`****${warning} CANCELLED****`) })
                        .setColor(0x00e8ff)
                    client.channels.cache.get((process.env.Admin_Channel_ID)).send({ embeds: [rconCancelWarn] });

                    rconCall(warnBroadcast, function () {
                        console.log(`${warnBroadcast}`);
                    });

                    await sleep(2000);

                    rconCall(warnMessage, function () {
                        console.log(`${warnMessage}`);
                    });
                    
                    cancelState.setCancelState(false);
                    restartState.setRestartState(false);
                    buttonsInfo(client);
                    return
                }

                rconCall(warnBroadcast, function () {
                    console.log(`${warnBroadcast}`);
                });

                await sleep(2000);

                rconCall(warnMessage, function () {
                    console.log(`${warnMessage}`);
                });

                await sleep(warnMinutes[i]);
                totalMin = totalMin - warnMinutes[i];
            }


            rconCall(`"DoExit"`, function (data) {
                (async function () {
                    await sleep(30000);
                    /*if (warning === "ADMIN FORCED RESTART") {
                        updateServer(`${warning}`, function (response) {
                            if ((`${response}`).includes("server is up to date")) {
                                startServer(`${warning}`, function (response) {
                                    if ((`${response}`).includes("server was started")) {
                                        const rconRestartWarn = new EmbedBuilder()
                                            .setTitle(process.env.Message_Tittle)
                                            .addFields({ name: `${warning}`, value: (`${process.env.Message_Tittle} server is now up to date\n${response}\nFinal bootup may take a few minutes before showing online`) })
                                            .setColor(0x00e8ff)
                                        client.channels.cache.get((process.env.Admin_Channel_ID)).send({ embeds: [rconRestartWarn] });
                                    }
                                });
                            }
                        });
                    } else {*/
                        if (warning === "ADMIN FORCED SHUTDOWN") {
                            var responseTrim = (`${data}`).trim();
                            const rconShutdownWarn = new EmbedBuilder()
                                .setTitle(process.env.Message_Tittle)
                                .addFields({ name: `${warning}`, value: (`${responseTrim}\n${process.env.Message_Tittle} shutdown successfully`) })
                                .setColor(0x00e8ff)
                            client.channels.cache.get((process.env.Admin_Channel_ID)).send({ embeds: [rconShutdownWarn] });
                            console.log(`${responseTrim}\n${process.env.Message_Tittle} shutdown successfully`);
                        } /*else {
                            if ((warning === "DAILY RESTART") || (warning === "MOD UPDATE RESTART")) {
                                updateServer(`${warning}`, function (response) {
                                    if ((`${response}`).includes("server is up to date")) {
                                        startServer(`${warning}`, function (response) {
                                            if ((`${response}`).includes("server was started")) {
                                                const rconDailyWarn = new EmbedBuilder()
                                                    .setTitle(process.env.Message_Tittle)
                                                    .addFields({ name: `${warning}`, value: (`${process.env.Message_Tittle} server is now up to date\n${response}\nFinal bootup may take a few minutes before showing online`) })
                                                    .setColor(0x00e8ff)
                                                client.channels.cache.get((process.env.Admin_Channel_ID)).send({ embeds: [rconDailyWarn] });
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    }*/
                })();
            });
        })();
    } catch (error) {
        return
    }
};

