require('dotenv').config();
const { EmbedBuilder } = require('discord.js');
const startServer = require("./server-start");

module.exports = (updateServer);


function updateServer([client, commandSender],callback) {

    try {
        const updateinfo = new EmbedBuilder()
            .setTitle(process.env.Message_Tittle)
            .addFields({ name: (`${commandSender}`), value: (`${process.env.Message_Tittle} checking for updates please wait....`) })
            .setColor(0x00e8ff)
        client.channels.cache.get((process.env.Admin_Channel_ID)).send({ embeds: [updateinfo] });

        var updateserver = require('child_process').spawn((process.env.Bot_Folder_Path) + ('/src/UpdateServer.bat'), [process.env.GameServerPath, process.env.Message_Tittle, process.env.SteamPath]);

        updateserver.stdout.on('data', function (data) {
            console.log(`${data}`);
        });
        updateserver.on('close', (code) => {
            if (code === 0) {
                startServer([client, commandSender]);
                return callback(code);
            } else {
                console.log("UPDATE ERROR: Try restarting the bot");
                const serverupdate = new EmbedBuilder()
                    .setTitle(process.env.Message_Tittle)
                    .addFields({ name: `${commandSender}`, value: `UPDATE ERROR: Try restarting the bot` })
                    .setColor(0x00e8ff)
                client.channels.cache.get((process.env.Admin_Channel_ID)).send({ embeds: [serverupdate] });
            }
        });
    } catch (error) {
        return
    }
};