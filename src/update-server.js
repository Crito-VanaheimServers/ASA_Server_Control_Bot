const config = require('config');
const { EmbedBuilder } = require('discord.js');
const startServer = require("./server-start");

module.exports = async function updateServer([clients, commandSender]) {
    return new Promise((resolve, reject) => {
        try {
            const client = clients[0];
            const server = clients[1];

            const updateinfo = new EmbedBuilder()
                .setTitle(config.get(`Servers.${server}.Game_Server_Name`))
                .addFields({ name: commandSender, value: `${config.get(`Servers.${server}.Game_Server_Name`)} checking for updates please wait....` })
                .setColor(0x00e8ff);
            client.channels.cache.get(config.get(`Servers.${server}.Admin_Channel_ID`)).send({ embeds: [updateinfo] });

            const updateserver = require('child_process').spawn(config.get(`ControlBot.Bot_Folder_Path`) + '/src/UpdateServer.bat', [config.get(`Servers.${server}.Server_Path`), config.get(`Servers.${server}.Game_Server_Name`), config.get(`ControlBot.Steam_Path`)]);

            updateserver.stdout.on('data', function (data) {
                console.log(`${data}`);
                if (`${data}`.includes("server is up to date")) {
                    resolve();
                }
            });
            updateserver.on('close', (code) => {
                if (code === 0) {
                    startServer([clients, commandSender]);
                    resolve(code);
                } else {
                    console.log("UPDATE ERROR: Try restarting the bot");
                    const serverupdate = new EmbedBuilder()
                        .setTitle(config.get(`Servers.${server}.Game_Server_Name`))
                        .addFields({ name: commandSender, value: "UPDATE ERROR: Try restarting the bot" })
                        .setColor(0x00e8ff);
                    client.channels.cache.get(config.get(`Servers.${server}.Game_Server_Name`)).send({ embeds: [serverupdate] });
                    reject(new Error("UPDATE ERROR"));
                }
            });
        } catch (error) {
            console.error('Error in updateServer function:', error);
            reject(error);
        }
    });
}
