const fs = require('fs');
const path = require('path');
const config = require('config');
const axios = require('axios');
const servers = config.get('Servers');

module.exports = async function modCollect() {
    try {
        const modIDsSet = new Set();

        for (const serverKey in servers) {
            const server = servers[serverKey];
            const modIDs = server.Mod_IDs.split(',').map(id => id.trim());
            modIDs.forEach(id => modIDsSet.add(id));
        }

        const allModIDs = Array.from(modIDsSet);
        const API_KEY = config.get('ControlBot.Curse_Forge_Token');

        const inputBody = {
            modIds: allModIDs,
            filterPcOnly: false
        };

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-api-key': API_KEY
        };

        axios.post('https://api.curseforge.com/v1/mods', inputBody, { headers })
            .then(function (res) {
                if (res.data && res.data.data && Array.isArray(res.data.data)) {
                    const folderPath = './src/mods';
                    if (!fs.existsSync(folderPath)) {
                        fs.mkdirSync(folderPath, { recursive: true });
                    }

                    res.data.data.forEach(mod => {
                        const fileName = `${mod.id}.txt`;
                        const filePath = path.join(folderPath, fileName);
                        const modData = JSON.stringify(mod, null, 2);
                        fs.writeFile(filePath, modData, (err) => {
                        });
                    });
                } else {
                    console.error('Mods invalid response data');
                }
            })
            .catch(function (error) {
                console.error('Error:', error);
            });
    } catch (error) {
        return
    }
};