const config = require('config');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const commaFormat = require("./comma-format");
const modChangeLog = require("./mod-changelog.js");
const getModInfo = require("./get-modinfo.js");

module.exports = async function modCheck(clients) {
    try {
        const client = clients[0];
        const server = clients[1];

        const modarray = JSON.parse(`[${config.get(`Servers.${server}.Mod_IDs`)}]`);
        
        for (const modId of modarray) {
            const modInfo = await getModInfo(modId);
            const mod = modInfo.data;
            
            const modDates = fs.readFileSync(`./src/mods/${mod.id}.txt`, { encoding: "utf8" });

            if (modDates !== mod.dateReleased) {
                clients[4] = true;
                let modDownloadCount = mod.downloadCount;
                commaFormat(modDownloadCount, response => {
                    modDownloadCount = response.toString();
                });
                const releasedInfo = mod.dateReleased.split(/[T,Z,.]/);
                const releasedTime = releasedInfo[1];
                const releasedDate = `${mod.dateReleased.substring(5, 7)}-${mod.dateReleased.substring(8, 10)}-${mod.dateReleased.substring(0, 4)}`;
                const fileId = mod.latestFiles[0].id;
                var modLog = await modChangeLog({ modId, fileId });
                const formattedModLog = modLog.data.replace(/<br>/g, '\n').replace(/<\/?p>/g, '').replace(/-/g, '\n-');
                
                const modUpdateEmbed = new EmbedBuilder()
                    .setTitle(mod.name)
                    .setAuthor({ name: `${mod.authors[0].name}`, iconURL: mod.categories[0].iconUrl, url: mod.authors[0].url })
                    .setImage(mod.logo.thumbnailUrl)
                    .addFields(
                        { name: `Mod ID`, value: `${mod.id}`, inline: true },
                        { name: 'Mod Downloads', value: `${modDownloadCount}`, inline: true },
                        { name: 'Mod Link', value: `${mod.links.websiteUrl}`, inline: false },
                        { name: 'Mod Change Notes', value: `${formattedModLog}`, inline: false },
                    )
                    .setFooter({ text: `Updated: ${releasedDate} ${releasedTime}`, iconURL: mod.links.websiteUrl })
                    .setColor(0x00e8ff)
                client.channels.cache.get(config.get(`Servers.${server}.Mod_Channel`)).send({ embeds: [modUpdateEmbed] })
            }
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Error modCheck: ' + error.message);
    }
};
