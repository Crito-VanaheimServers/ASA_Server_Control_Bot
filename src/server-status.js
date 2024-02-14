const { exec } = require('child_process');
const config = require('config');

module.exports = (serverStatus);

function serverStatus(clients) {
    return new Promise((resolve, reject) => {
        try {
            const server = clients[1];

            exec(`"${config.get(`ControlBot.Bot_Folder_Path`)}/src/ServerCheck.bat" "${config.get(`Servers.${server}.Server_Path`)}" "${config.get(`Servers.${server}.Game_Server_Name`)}"`, (error, stdout, stderr) => {
                if (error) {
                    console.error('Error checking server status:', error);
                    reject(stderr);
                } else {
                    resolve(stdout);
                }
            });
        } catch (error) {
            console.error('Error in serverStatus function:', error);
            reject('Error in serverStatus function');
        }
    });
}
