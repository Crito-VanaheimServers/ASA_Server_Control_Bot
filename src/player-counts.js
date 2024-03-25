const config = require('config');
const { ActivityType } = require('discord.js');
const Gamedig = require('gamedig');

module.exports = (playerCounts);

function playerCounts(clients) {
    try {
        var client = clients[0];
        var server = clients[1];

        Gamedig.query({
            type: 'asa',
            host: config.get(`Servers.${server}.Global_IP`),
            port: config.get(`Servers.${server}.Game_Port`)
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