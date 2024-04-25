const config = require('config');
const { exec } = require('child_process');
const { EmbedBuilder } = require('discord.js');

module.exports = (startServer);

async function startServer([clients, commandSender,updateMsg]) {
try {
        const client = clients[0];
        const server = clients[1];
        const serverPath = config.get(`Servers.${server}.Server_Path`);
        const gameExecutable = config.get(`Servers.${server}.EXE_Launcher`);
        const cmdLine = config.get(`Servers.${server}.Command_Line`);
 
        const modifiedCmdLine = cmdLine.replace(/'/g, '"');
    
        const cmd = `"${serverPath}\\ShooterGame\\Binaries\\Win64\\${gameExecutable}" ${modifiedCmdLine}`;
    
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                return;
            }

            console.log(stdout);
            const message = `${updateMsg}\n${config.get(`Servers.${server}.Game_Server_Name`)} server is up to date.\n${stdout}`;
            const serverstart = new EmbedBuilder()
                .setTitle(config.get(`Servers.${server}.Game_Server_Name`))
                .addFields({ name: commandSender, value: message })
                .setColor(0x00e8ff);
            client.channels.cache.get(config.get(`Servers.${server}.Admin_Channel_ID`)).send({ embeds: [serverstart] });
        });
    } catch (error) {
        console.error('Error in serverStart:', error);
    }
}