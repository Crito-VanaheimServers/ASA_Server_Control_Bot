require('dotenv').config();
const { EmbedBuilder } = require('discord.js');
const buttonsInfo = require("./buttons-info");

module.exports = (startServer);

function startServer([client, commandSender]) {
    try {
        var serverstart = require('child_process').spawn((process.env.Bot_Folder_Path) + ('/src/ServerStart.bat'), [process.env.GameServerPath, process.env.Message_Tittle, process.env.EXELauncher, process.env.Command_Line]);

        serverstart.stdout.on('data', function (data) {
            console.log(`${data}`);
            const message = (`${process.env.Message_Tittle} server is up to date.\n${data}`);
            const serverstart = new EmbedBuilder()
                .setTitle(process.env.Message_Tittle)
                .addFields({ name: (`${commandSender}`), value: (`${message}`) })
                .setColor(0x00e8ff)
            client.channels.cache.get((process.env.Admin_Channel_ID)).send({ embeds: [serverstart] });
            buttonsInfo(client);
        });
        serverstart.stderr.on('err', function (err) {
            console.log("SERVER START ERROR: Try restarting the bot");
            const startserver = new EmbedBuilder()
                .setTitle(process.env.Message_Tittle)
                .addFields({ name: commandSender, value: `SERVER START ERROR: Try restarting the bot` })
                .setColor(0x00e8ff)
            client.channels.cache.get((process.env.Admin_Channel_ID)).send({ embeds: [startserver] });
            buttonsInfo(client);
        });
    } catch (error) {
        return
    }
};
