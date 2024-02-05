require('dotenv').config();
const Rcon = require('rcon/node-rcon');

module.exports = (rconCall);

function rconCall(rconCMD, callback) {
    try {
        var rconoptions = {
            tcp: true,
            challenge: false
        };

        var conn = new Rcon(process.env.ASA_ServerIP, process.env.ASA_rcon_port, process.env.ASA_password, rconoptions);

        conn.on('auth', function () {
            conn.send(rconCMD);
        }).on('response', function (rconInfo) {
            conn.emit('end');
            return callback(rconInfo);
        }).on('error', function (err) {
            conn.emit('end');
        }).on('end', function () {
            conn.disconnect();
        });

        conn.connect();
    } catch (error) {
        console.error('Error in rconCall:', error);
    }
}