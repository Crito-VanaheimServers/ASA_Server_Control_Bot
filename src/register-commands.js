const config = require('config');
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const servers = config.get('Servers');
for (const serverKey in servers) {
    var IDName = config.get(`Servers.${serverKey}.Game_Server_Name`).toLowerCase().replace(/\s+/g, '_');
    const commands = [
        {
            name: `${IDName}_rcon`,
            description: 'Send RCON commands to server',
            options: [
                {
                    name: 'rcon-command',
                    description: 'RCON command to send to server',
                    type: ApplicationCommandOptionType.String,
                    required: true,
                }
            ]
        },

        {
            name: `${IDName}_players`,
            description: 'get a list of the currently connected players',
        },
        
        {
            name: `${IDName}_info`,
            description: 'get information about the server',
        },
    ];

    const rest = new REST({ version: '10' }).setToken(config.get(`Servers.${serverKey}.Player_Count_Bot_Token`));

    (async () => {
        try {
            console.log('Registering slash commands...');

            await rest.put(
                Routes.applicationGuildCommands(config.get(`Servers.${serverKey}.Bot_ID`),
                    config.get(`ControlBot.Discord_ID`)),
                { body: commands }
            )

            console.log('slash commands were registered successfully');
        } catch (error) {
            console.log(`There was an error: ${error}`);
        }
    })();
}