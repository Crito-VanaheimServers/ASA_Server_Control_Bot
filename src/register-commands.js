require('dotenv').config();
const {REST, Routes, ApplicationCommandOptionType} = require ('discord.js');


const commands = [
   
    {
        name: (process.env.Map_Name)+'_players',
        description: 'See the currently connected players for Ark Survival Ascended The Island server',
    },
    
];

const rest = new REST({ version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(process.env.Bot_ID,
            process.env.DiscordServer_ID),
            {body: commands}
        )

        console.log('slash commands were registered successfully');
    } catch (error){
        console.log(`There was an error: ${error}`);
    }
})();