const { exec } = require('child_process');
const config = require('config');
const { EmbedBuilder } = require('discord.js');
const startServer = require("./server-start");

module.exports = async function updateServer([clients, commandSender]) {
    const updateServer = (directory, serverName, steamcmdPath, branch = '2430930', steamLogin = 'anonymous', callback) => {
        console.log(`You are about to update your ${serverName} server`);
        console.log(`Dir: ${directory}`);
        console.log(`Branch: ${branch}`);
        console.log(`checking for updates could take some time please wait....`);
        const cmd = `"${steamcmdPath}\\steamcmd.exe" +force_install_dir "${directory}" +login ${steamLogin} +"app_update ${branch}" validate +quit`;
        let updateCompleted = false;
    
        exec(cmd, (error, stdout, stderr) => {
            if (!updateCompleted) {
                updateCompleted = true;
                if (callback && typeof callback === 'function') {
                    if (error) {
                        console.error(`Error updating ${serverName} server: ${error}`);
                        callback(error);
                    } else {
                        const message = `${serverName} server is up to date`;
                        console.log(stdout);
                        console.log(message);
                        callback(null, message);
                    }
                } else {
                    console.error('Callback is not a function');
                }
            }
        });
    };

    try {
        const client = clients[0];
        const server = clients[1];
    
        const updateinfo = new EmbedBuilder()
            .setTitle(config.get(`Servers.${server}.Game_Server_Name`))
            .addFields({ name: commandSender, value: `${config.get(`Servers.${server}.Game_Server_Name`)} checking for updates could take some time please wait....` })
            .setColor(0x00e8ff);
        client.channels.cache.get(config.get(`Servers.${server}.Admin_Channel_ID`)).send({ embeds: [updateinfo] });
    
        const serverDirectory = config.get(`Servers.${server}.Server_Path`);
        const serverName = config.get(`Servers.${server}.Game_Server_Name`);
        const steamcmdPath = config.get(`ControlBot.Steam_Path`);
        const branch = '2430930';
    
        const updateCallback = (error, message) => {
            if (error) {
                console.error('An error occurred during server update:', error);
            } else {
                startServer([clients, commandSender,message]);
            }
        };

        updateServer(serverDirectory, serverName, steamcmdPath, branch, 'anonymous', updateCallback); // Assuming 'anonymous' is the correct Steam login
    
    } catch (error) {
        console.error('An error occurred:', error);
    }
}
