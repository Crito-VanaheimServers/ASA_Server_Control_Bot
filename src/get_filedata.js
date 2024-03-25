const config = require('config');
const ArkFiles = require('ark-files');

module.exports = async function plyrSaveInfo([clients, trgtName]) {
    try {
        var server = clients[1];

        const arkServerDir = config.get(`Servers.${server}.Saves_Path`);

        const arkData = new ArkFiles(arkServerDir);

        const players = arkData.getPlayers();
        const tribes = arkData.getTribes();

        function findPlayerByName(players, playerName) {
            return players.find(player => player.PlayerName === playerName);
        }

        function findtribeMembers(players, TribeId) {
            return players.filter(player => player.TribeId === TribeId);
        }

        function findTribeByID(tribes, TribeId) {
            return tribes.find(tribe => tribe.TribeIdNum === TribeId);
        }

        function stringifyPlayer(player) {
            const playerString = `Player Name: ${'`' + player.PlayerName + '`'},\nCharacter Name: ${'`' + player.CharacterName + '`'},\nPlayer Id: ${'`' + player.PlayerId + '`'},\nEosID: ${'`' + player.PlayerEosID + '`'},\nTribe Id: ${'`' + 'No Tribe' + '`'}`;
            return playerString;
        }

        function stringifyTribe(player) {
            const tribe = player.tribe;
            const tribeMemberNames = tribe.members.join(',\n');
            const playerString = `Player Name: ${'`' + player.PlayerName + '`'},\nCharacter Name: ${'`' + player.CharacterName + '`'},\nPlayer Id: ${'`' + player.PlayerId + '`'},\nEosID: ${'`' + player.PlayerEosID + '`'},\nTribe Id: ${'`' + player.TribeId + '`'},\nTribe Name: ${'`' + tribe.TribeName + '`'},\nTribe Members:\n${'```' + tribeMemberNames + '```'}`;
            return playerString;
        }

        let playerString = "";
        let player = findPlayerByName(players, trgtName);
        if (player) {
            if (player.TribeId !== false) {
                const tribe = findTribeByID(tribes, player.TribeId);
                if (tribe) {
                    const tribeMembers = findtribeMembers(players, player.TribeId);
                    const tribeMemberNames = tribeMembers.map(member => member.PlayerName);
                    tribe.members = tribeMemberNames;
                    player.tribe = tribe;
                    playerString = stringifyTribe(player);
                } else {
                    playerString = stringifyPlayer(player);
                }
            }
            return playerString;
        } else {
            return `Player with PlayerName '${trgtName}' not found.`;
        }
    } catch (error) {
        console.error(error);
        return `Error In get_filedata.js: ${error.message}`;
    }
};