const config = require('config');
const BM = require('@leventhan/battlemetrics')

module.exports = (serverBMInfo);

async function serverBMInfo(client) {
    try {
        var server = client[1];

        const options = {
            token: config.get('ControlBot.Battle_Metrics_Token'),
            serverID: config.get(`Servers.${server}.Battle_Metrics_ServerID`),
            game: 'arksa'
        };

        const battleMetrics = new BM(options);
        const serverInfo = await battleMetrics.getServerInfoById(options.serverID);
        return serverInfo;
    } catch (error) {
        console.error('Error in serverBMInfo function:', error);
        throw new Error('Error in serverBMInfo function');
    }
};