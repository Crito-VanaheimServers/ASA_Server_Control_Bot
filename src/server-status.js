require('dotenv').config();
const { exec } = require('child_process');

module.exports = (serverStatus);

function serverStatus(callback) {
    try {
        exec(`"${process.env.Bot_Folder_Path}/src/ServerCheck.bat" "${process.env.GameServerPath}" "${process.env.Message_Tittle}"`, (error, stdout, stderr) => {
            if (error) {
                console.error('Error checking server status:', error);
                return callback(stderr); // Assuming errors are sent via stderr
            }
            return callback(stdout);
        });
    } catch (error) {
        console.error('Error in serverStatus function:', error);
        return callback('Error in serverStatus function');
    }
}