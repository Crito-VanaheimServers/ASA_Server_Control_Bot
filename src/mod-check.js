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
            const modLog = await modChangeLog({ modId, fileId });
            let formattedModLog = modLog.data.replace(/<br>/g, '\n').replace(/<\/?p>/g, '').replace(/-/g, '\n-');
            
            const maxLength = 1000;
            const chunks = [];
            
            while (formattedModLog.length > maxLength) {
                let chunk = formattedModLog.substring(0, maxLength);
                const lastLineBreakIndex = chunk.lastIndexOf('\n');
                if (lastLineBreakIndex !== -1) {
                    chunk = formattedModLog.substring(0, lastLineBreakIndex);
                    formattedModLog = formattedModLog.substring(lastLineBreakIndex + 1);
                } else {
                    formattedModLog = formattedModLog.substring(maxLength);
                }
                chunks.push(chunk);
            }
            
            if (formattedModLog.length > 0) {
                chunks.push(formattedModLog);
            }
            
            const modUpdateEmbed = new EmbedBuilder()
                .setTitle(mod.name)
                .setAuthor({ name: `${mod.authors[0].name}`, iconURL: mod.categories[0].iconUrl, url: mod.authors[0].url })
                .setImage(mod.logo.thumbnailUrl)
                .addFields(
                    { name: `Mod ID`, value: `${mod.id}`, inline: true },
                    { name: 'Mod Downloads', value: `${modDownloadCount}`, inline: true },
                    { name: 'Mod Link', value: `${mod.links.websiteUrl}`, inline: false },
                    { name: 'Mod Change Notes', value: '\u200B', inline: false },
                )
                .setFooter({ text: `Updated: ${releasedDate} ${releasedTime}`, iconURL: mod.links.websiteUrl })
                .setColor(0x00e8ff);
            
            for (const chunk of chunks) {
                modUpdateEmbed.addFields({ name: '\u200B', value: chunk, inline: false });
            }
            
            client.channels.cache.get(config.get(`Servers.${server}.Mod_Channel`)).send({ embeds: [modUpdateEmbed] });
        }
    }
} catch (error) {
    console.error('Error:', error);
    throw new Error('Error modCheck: ' + error.message);
}
};
