const { exec } = require('child_process');
const config = require('config');
const Rcon = require('rcon/node-rcon');

module.exports = (serverStatus);

function serverStatus(clients) {
    const server = clients[1];
    if (config.get(`ControlBot.Steam_Path`) !== "") {
        return new Promise((resolve, reject) => {
            try {
                const server = clients[1];

                exec(`"${config.get(`ControlBot.Bot_Folder_Path`)}/src/ServerCheck.bat" "${config.get(`Servers.${server}.Server_Path`)}" "${config.get(`Servers.${server}.Game_Server_Name`)}"`, (error, stdout, stderr) => {
                    if (error) {
                        console.error('Error checking server status:', error);
                        reject(stderr);
                    } else {
                        const result = stdout.trim();
                        resolve(result);
                    }
                });
            } catch (error) {
                console.error('Error in serverStatus function:', error);
                reject('Error in serverStatus function');
            }
        });
    } else {
        return new Promise((resolve, reject) => {
            try {
                var rconoptions = {
                    tcp: true,
                    challenge: false
                };
                var conn = new Rcon(config.get(`Servers.${server}.Local_IP`), config.get(`Servers.${server}.Rcon_Port`), config.get(`Servers.${server}.Admin_Password`), rconoptions);

                conn.on('auth', function () {
                    conn.send(`ListPlayers`);
                }).on('response', function (rconInfo) {
                    conn.emit('end');
                    resolve(config.get(`Servers.${server}.Game_Server_Name`) + ` Online`);
                }).on('error', function (err) {
                    conn.emit('end');
                    resolve(config.get(`Servers.${server}.Game_Server_Name`) + ` Offline`);
                }).on('end', function () {
                    conn.disconnect();
                });

                conn.connect();
            } catch (error) {
                return
            }
        });
    }
}