const config = require('config');
const fs = require('fs');
const getModInfo = require("./get-modinfo.js");

module.exports = (modCollect);

async function modCollect(clients) {
    try {
        const server = clients[1];

        const modarray = JSON.parse("[" + config.get(`Servers.${server}.Mod_IDs`) + "]");
        for (const modId of modarray) {
            const modInfo = await getModInfo(modId);
            const mod = modInfo.data;
            const currentModsFile = fs.createWriteStream(`./src/mods/${mod.id}.txt`);
            currentModsFile.write(`${mod.dateReleased}`);
            currentModsFile.end();
        }
    } catch (error) {
        return
    }
}