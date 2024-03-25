const config = require('config');
const { REST, Routes } = require('discord.js');

module.exports = async () => {
    const servers = config.get('Servers');

    for (const serverKey in servers) {
        const IDName = config.get(`Servers.${serverKey}.Game_Server_Name`).toLowerCase().replace(/\s+/g, '_');
        let commands = [];

        if (config.get(`ControlBot.Battle_Metrics_Token`) !== "") {
            commands.push({
                name: `${IDName}_server_info`,
                description: 'Get information about the server',
            });
        }

        if (config.get(`ControlBot.Player_List`)) {
            commands.push({
                name: `${IDName}_players`,
                description: 'Get a list of the currently connected players',
            });
        }

        const rest = new REST({ version: '10' }).setToken(config.get(`Servers.${serverKey}.Bot_Token`));

        try {
            await rest.put(
                Routes.applicationGuildCommands(config.get(`Servers.${serverKey}.Bot_ID`), config.get(`ControlBot.Discord_ID`)),
                { body: commands }
            );
        } catch (error) {
            console.error(`Error registering slash command for server ${IDName}:`, error);
        }
    }
};