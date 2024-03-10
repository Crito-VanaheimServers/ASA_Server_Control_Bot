const config = require('config');
const ArkFiles = require('ark-files');

module.exports = async function plyrSaveInfo([clients, trgtName]) {
    try {
        var server = clients[1];

        const arkServerDir = config.get(`Servers.${server}.Saves_Path`);

        const arkData = new ArkFiles(arkServerDir);

        const players = arkData.getPlayers();
        
        function findPlayerByName(players, playerName) {
            return players.find(player => player.PlayerName === playerName);
        }
        
        const player = findPlayerByName(players, trgtName);
        
        if (player) {
            // Convert player object to string
            const playerString = stringifyPlayer(player);
            return playerString;
        } else {
            return `Player with PlayerName '${trgtName}' not found.`;
        }
    } catch (error) {
        console.error(error);
        return `Error In get_filedata.js: ${error.message}`;
    }
};

function stringifyPlayer(player) {
    const playerString = `Player Name: ${player.PlayerName},\nCharacter Name: ${player.CharacterName},\nPlayer Id: ${player.PlayerId},\nEosID: ${player.PlayerEosID},\nLevel: ${player.Level},\nEngram Points: ${player.TotalEngramPoints},\nTribe Id: ${player.TribeId}`;
    return playerString;
}