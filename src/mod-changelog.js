const config = require('config');

module.exports = (modChangeLog);

async function modChangeLog({ modId, fileId }) {
    const baseUrl = 'https://api.curseforge.com/v1';
    const url = `${baseUrl}/mods/${modId}/files/${fileId}/changelog`;

    const API_KEY = config.get('ControlBot.Curse_Forge_Token');

    const headers = {
        'Accept': 'application/json',
        'x-api-key': API_KEY
    };

    try {
        while (true) {
            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            });

            if (response.ok) {
                const body = await response.json();
                return body;
            } else {
                await new Promise(resolve => setTimeout(resolve, 30000));
            }
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Error fetching mod change logs for: ' + modId + error.message);
    }
}