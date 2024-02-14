const config = require('config');
const Rcon = require('rcon/node-rcon');

module.exports = async function rconCall([clients, rconCMD]) {
    try {
        var server = clients[1];

        var rconoptions = {
            tcp: true,
            challenge: false
        };

        return new Promise((resolve, reject) => {
            var conn = new Rcon(config.get(`Servers.${server}.Local_IP`), config.get(`Servers.${server}.Rcon_Port`), config.get(`Servers.${server}.Admin_Password`), rconoptions);

            conn.on('auth', function () {
                conn.send(rconCMD);
            }).on('response', function (rconInfo) {
                conn.emit('end');
                resolve(rconInfo);
            }).on('error', function (err) {
                conn.emit('end');
                reject(err);
            }).on('end', function () {
                conn.disconnect();
            });

            conn.connect();
        });
    } catch (error) {
        return
    }
};