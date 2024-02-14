const config = require('config');
const fs = require('fs');
const { CurseForgeApi } = require("curseforge-core-api");

module.exports = (modCollect);

async function modCollect(clients) {
    try {
        const server = clients[1];

        const ModsApi = new CurseForgeApi({ api_key: config.get(`ControlBot.Curse_Forge_Token`) })

        const modarray = JSON.parse("[" + config.get(`Servers.${server}.Mod_IDs`) + "]");
        for (let i = 0; i < modarray.length; i++) {
            const { mod, description } = await ModsApi.getMod({
                modId: modarray[i]
            });
            const currentModsFile = fs.createWriteStream(`./src/mods/${mod.id}.txt`);
            currentModsFile.write(`${mod.dateReleased}`);
            currentModsFile.end();
        }
    } catch (error) {
        return
    }
}