const config = require('config');
const rconCall = require('./rcon-call');

module.exports = async function discordChat([clients, chatMessage]) {
    try {
        var client = clients[0];
        var server = clients[1];

        var message = "";
        var sender = chatMessage.author.globalName;
        var vip = `${config.get(`Servers.${server}.VIP_Players`)}`.split(',');
        var vipBool = vip.includes(sender);

        if (sender === null) {
            if (chatMessage.author.id === client.user.id) {
                return;
            }
            const servers = config.get('Servers');
            for (const serverKey in servers) {
                const target = servers[serverKey];
                if (target.Bot_ID === chatMessage.author.id) {
                    sender = config.get(`Servers.${serverKey}.Game_Server_Name`);
                    vipBool = true;
                    message += `ChatLogAppend `;
                    message += `${(vipBool) ? `<RichColor Color=\"${config.get(`Servers.${serverKey}.Server_Color`)}">` : ""}`;
                    message += `[${sender}]`;
                    message += `${(vipBool) ? "</> " : ""}`;
                    message += ": ";
                    message += `${chatMessage.content}`;
                }
            }
        } else {
            message += `ChatLogAppend `;
            message += `${(vipBool) ? `<RichColor Color=\"${config.get(`Servers.${server}.VIP_Color`)}">` : ""}`;
            message += `[Discord] ${sender}`;
            message += `${(vipBool) ? "</> " : ""}`;
            message += ": ";
            message += `${chatMessage.content}`;
        }

        if (!(message.includes("ADMIN FORCED RESTART") || message.includes("ADMIN FORCED SHUTDOWN") || message.includes("DAILY RESTART") || message.includes("MOD UPDATE RESTART"))) {
            const response = await rconCall([clients, message]);
            if (response) {
                console.log(`${sender}: ${chatMessage.content}`);
            }
        }
    } catch (error) {
        return
    }
};

