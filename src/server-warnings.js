const config = require('config');
const { EmbedBuilder } = require('discord.js');
const rconCall = require("./rcon-call");
const buttonsInfo = require("./buttons-info.js");
const serverStatus = require("./server-status.js");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = async function gameWarning([clients, warning, clientsArray]) {
    try {
        const client = clients[0];
        const server = clients[1];

        const warnMinutes = [300000, 300000, 60000, 60000, 60000, 60000, 60000];
        let totalMin = warnMinutes.reduce((acc, curr) => acc + curr, 0);

        for (let i = 0; i < warnMinutes.length; i++) {
            let totalMinConv = totalMin / 60000;
            let warnBroadcast, warnMessage;

            if (clients[3] === false) {
                warnBroadcast = `Broadcast ****${warning} ${totalMinConv} MINUTES****`;
                warnMessage = `ServerChat ****${warning} ${totalMinConv} MINUTES****`;
            } else {
                warnBroadcast = `Broadcast ****${warning} CANCELLED****`;
                warnMessage = `ServerChat ****${warning} CANCELLED****`;

                const rconCancelWarn = new EmbedBuilder()
                    .setTitle(config.get(`Servers.${server}.Game_Server_Name`))
                    .addFields({ name: `${warning}`, value: (`****${warning} CANCELLED****`) })
                    .setColor(0x00e8ff);
                await client.channels.cache.get(config.get(`Servers.${server}.Admin_Channel_ID`)).send({ embeds: [rconCancelWarn] });

                rconCall([clients, warnBroadcast]);
                console.log(`${warnBroadcast}`);

                await sleep(2000);

                rconCall([clients, warnMessage]);
                console.log(`${warnMessage}`);

                clients[2] = false;
                clients[3] = false;
                await buttonsInfo(clientsArray);
                return;
            }

            rconCall([clients, warnBroadcast]);
            console.log(`${warnBroadcast}`);

            await sleep(2000);

            rconCall([clients, warnMessage]);
            console.log(`${warnMessage}`);

            await sleep(warnMinutes[i]);
            totalMin -= warnMinutes[i];
        }

        if (config.get(`ControlBot.Steam_Path`) === "") {
            if (warning === "ADMIN FORCED SHUTDOWN") {
                rconCall([clients, 'DoExit']);
            } else {
                rconCall([clients, 'DoRestartLevel']);
            }
        } else {
            rconCall([clients, 'DoExit']);
        }

        let status = await serverStatus(clients);
        while (!status.includes("Offline")) {
            await new Promise(resolve => setTimeout(resolve, 3000));
            status = await serverStatus(clients);
        }

        if (warning === "ADMIN FORCED RESTART") {
            clients[2] = false;
        } else if (warning === "ADMIN FORCED SHUTDOWN") {
            const rconShutdownWarn = new EmbedBuilder()
                .setTitle(config.get(`Servers.${server}.Game_Server_Name`))
                .addFields({ name: `${warning}`, value: (`${config.get(`Servers.${server}.Game_Server_Name`)} shutdown successfully`) })
                .setColor(0x00e8ff);
            await client.channels.cache.get(config.get(`Servers.${server}.Admin_Channel_ID`)).send({ embeds: [rconShutdownWarn] });
            console.log(`${config.get(`Servers.${server}.Game_Server_Name`)} shutdown successfully`);
            await sleep(20000);
            await buttonsInfo(clientsArray);
        } else if (warning === "DAILY RESTART" || warning === "MOD UPDATE RESTART") {
            clients[2] = false;
        }
    } catch (error) {
        return
    }
}