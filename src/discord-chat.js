const config = require('config');
const rconCall = require('./rcon-call');

module.exports = async function discordChat([clients, chatMessage]) {
    try {
        var client = clients[0];

        var message = chatMessage.content;
        var sender = chatMessage.author.globalName;
        var messageToSend = `${sender}: ${message}`;
        if (sender === null) {
            if (chatMessage.author.id === client.user.id) {
                return;
            }
            const servers = config.get('Servers');
            for (const serverKey in servers) {
                const target = servers[serverKey];
                if (target.Bot_ID === chatMessage.author.id) {
                    sender = config.get(`Servers.${serverKey}.Game_Server_Name`);
                    messageToSend = `${sender}: ${message}`;
                }

            }
        } else {
            messageToSend = `(Discord) ${sender}: ${message}`;
        }

        if (!(messageToSend.includes("ADMIN FORCED RESTART") || messageToSend.includes("ADMIN FORCED SHUTDOWN") || messageToSend.includes("DAILY RESTART") || messageToSend.includes("MOD UPDATE RESTART"))) {
            const response = await rconCall([clients, `ServerChat ${messageToSend}`]);
            if (response) {
                console.log(`${messageToSend}`);
            }
        }

    } catch (error) {
        console.error('Error in discordChat:', error);
    }
};