require('dotenv').config();
const fs = require('fs');
const { CurseForgeApi } = require("curseforge-core-api");

module.exports = (modCollect);

function modCollect() {
    try {
        (async function () {
            const ModsApi = new CurseForgeApi({ api_key: (process.env.CFToken) })

            var modarray = JSON.parse("[" + (process.env.Mod_IDs) + "]");
            for (let i = 0; i < modarray.length; i++) {
                const { mod, description } = await ModsApi.getMod({
                    modId: modarray[i]
                })
                var currentModsFile = fs.createWriteStream(`./src/mods/${mod.id}.txt`);
                currentModsFile.write(`${mod.dateReleased}`);
            }
        })();
    } catch (error) {
        return
    }
}