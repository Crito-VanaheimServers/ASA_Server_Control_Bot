const config = require('config');
const { EmbedBuilder } = require('discord.js');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = (startServer);

async function startServer([clients, commandSender]) {
    try {
        const client = clients[0];
        const server = clients[1];

        var serverstart = require('child_process').spawn(config.get(`ControlBot.Bot_Folder_Path`) + ('/src/ServerStart.bat'), [config.get(`Servers.${server}.Server_Path`), config.get(`Servers.${server}.Game_Server_Name`), config.get(`Servers.${server}.EXE_Launcher`), config.get(`Servers.${server}.Command_Line`)]);

        serverstart.stdout.on('data', function (data) {
            console.log(`${data}`);
            const message = (`${config.get(`Servers.${server}.Game_Server_Name`)} server is up to date.\n${data}`);
            const serverstart = new EmbedBuilder()
                .setTitle(config.get(`Servers.${server}.Game_Server_Name`))
                .addFields({ name: (`${commandSender}`), value: (`${message}`) })
                .setColor(0x00e8ff)
            client.channels.cache.get((config.get(`Servers.${server}.Admin_Channel_ID`))).send({ embeds: [serverstart] });
        });
        serverstart.stderr.on('error', function (error) {
            console.log("SERVER START ERROR: Try restarting the bot");
            const startserver = new EmbedBuilder()
                .setTitle(config.get(`Servers.${server}.Game_Server_Name`))
                .addFields({ name: commandSender, value: `SERVER START ERROR: Try restarting the bot` })
                .setColor(0x00e8ff)
            client.channels.cache.get((config.get(`Servers.${server}.Admin_Channel_ID`))).send({ embeds: [startserver] });
        });

        //await sleep(60000);
        //clients[2] = false;
        //clients[4] = false;
    } catch (error) {
        console.error('Error in serverStart:', error);
        return
    }
};
