require('dotenv').config();
const { ActivityType } = require('discord.js');
const Gamedig = require('gamedig');

module.exports = (playerCounts);

function playerCounts(client) {
    try {
        Gamedig.query({
            type: 'asa',
            host: (process.env.Global_IP),
            port: (process.env.Game_Port)
        }).then((res) => {
            var plyrCnt = res.raw.totalPlayers;
            var maxSlots = res.maxplayers;

            client.user.setPresence({
                activities: [{
                    name: (`Players ${plyrCnt}/${maxSlots}`),
                    type: ActivityType.Custom,
                }],
                status: 'online'
            });
        }).catch((error) => {
            client.user.setPresence({
                activities: [{
                    name: (`Players 0/0`),
                    type: ActivityType.Custom,
                }],
                status: 'online'
            });
        })
    } catch (error) {
        return
    }
}