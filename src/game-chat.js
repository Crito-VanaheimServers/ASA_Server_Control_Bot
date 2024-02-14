const config = require('config');
const { EmbedBuilder } = require('discord.js');
const rconCall = require('./rcon-call');

module.exports = async function gameChat(clients) {
    try {
        var client = clients[0];
        var server = clients[1];

        const response = await rconCall([clients, 'GetChat']);

        if (`${response}`.trim() === 'Server received, But no response!!') {
            return;
        }

        const chatTrim = `${response}`.trim();
        const chatSplit = chatTrim.split(/[\n]/);

        for (let i = 0; i < chatSplit.length; i++) {
            var PlyrChat = chatSplit[i];

            const servers = config.get('Servers');
            for (const serverKey in servers) {
                const target = servers[serverKey];
                if (PlyrChat.includes(target.Game_Server_Name)) {
                    return;
                }
            }

            if (PlyrChat.includes('AdminCmd') || PlyrChat.includes('(Discord)')) {
                return;
            }



            client.channels.cache.get(config.get(`Servers.${server}.Chat_Channel_ID`)).send(`${PlyrChat}`);
            console.log(`${PlyrChat}`);
        }
    } catch (error) {
        return
    }
};