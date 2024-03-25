const config = require('config');
const rconCall = require("./rcon-call.js");

module.exports = async function joinLeave(clients) {
    try {
        var client = clients[0];
        var server = clients[1];
        var message = "";
        var sender = config.get(`Servers.${server}.Game_Server_Name`);

        const response = await rconCall([clients, 'ListPlayers']);
        var plyrTrim = response.trim();
        var plyrSplit = plyrTrim.split(/[,,\n]/);
        var newPlayerList = [];

        if (plyrSplit[0].trim() === 'No Players Connected') {
        } else {
            for (let i = 0; i < plyrSplit.length; i++) {

                if (plyrSplit[i].length < 30) {
                    const spaceIndex = plyrSplit[i].indexOf(' ');
                    if (spaceIndex !== -1) {
                        plyrSplit[i] = plyrSplit[i].slice(spaceIndex + 1);
                    }

                    newPlayerList.push(plyrSplit[i]);
                }
            }
        }

        let oldPlayerList = clients[5][0];
        if (clients[5][1]) {
            clients[5][0] = newPlayerList;
            clients[5][1] = false;
            return
        };

        let newPlayers = newPlayerList.filter(player => !oldPlayerList.includes(player));

        newPlayers.forEach(player => {
            let joinMessage = (`${player} connected`);
            var vipBool = true;
            message += `ChatLogAppend `;
            message += `${(vipBool) ? `<RichColor Color=\"0,0,0,1">` : ""}`;
            message += `${(vipBool) ? "</> " : ""}`;
            message += `${joinMessage}`;
            if (config.get(`ControlBot.Player_Connection_Game`)) {
                rconCall([clients, message]);
            }

            if (config.get(`ControlBot.Player_Connection_Discord`)) {
                if (config.get(`Servers.${server}.Chat_Channel_ID`) !== "") {
                    client.channels.cache.get(config.get(`Servers.${server}.Chat_Channel_ID`)).send(`${joinMessage}`);
                };
            };
            console.log(`${sender}: ${joinMessage}`);
        });

        oldPlayerList.forEach(player => {
            if (!newPlayerList.includes(player)) {
                let leaveMessage = (`${player} disconnected`);
                var vipBool = true;
                message += `ChatLogAppend `;
                message += `${(vipBool) ? `<RichColor Color=\"0,0,0,1">` : ""}`;
                message += `${(vipBool) ? "</> " : ""}`;
                message += `${leaveMessage}`;
                if (config.get(`ControlBot.Player_Connection_Game`)) {
                    rconCall([clients, message]);
                }

                if (config.get(`ControlBot.Player_Connection_Discord`)) {
                    if (config.get(`Servers.${server}.Chat_Channel_ID`) !== "") {
                        client.channels.cache.get(config.get(`Servers.${server}.Chat_Channel_ID`)).send(`${leaveMessage}`);
                    };
                };
                console.log(`${sender}: ${leaveMessage}`);
            }
        });

        clients[5][0] = newPlayerList;
    } catch (error) {
        console.log(error);
    }
};