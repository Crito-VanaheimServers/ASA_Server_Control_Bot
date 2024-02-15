const config = require('config');
const { EmbedBuilder } = require('discord.js');
const { CurseForgeApi } = require("curseforge-core-api");
const fs = require('fs');
const commaFormat = require("./comma-format");

module.exports = async function modCheck(clients) {
    try {
        const client = clients[0];
        const server = clients[1];

        const ModsApi = new CurseForgeApi({ api_key: config.get(`ControlBot.Curse_Forge_Token`) });
        const modarray = JSON.parse(`[${config.get(`Servers.${server}.Mod_IDs`)}]`);
        
        const embedBuilder = new EmbedBuilder();

        for (const modId of modarray) {
            const { mod } = await ModsApi.getMod({ modId });
            const modDates = fs.readFileSync(`./src/mods/${mod.id}.txt`, { encoding: "utf8" });

            if (modDates !== mod.dateReleased) {
                clients[4] = true;
                let modDownloadCount = mod.downloadCount;
                commaFormat(modDownloadCount, response => {
                    modDownloadCount = response.toString(); // Convert to string
                });
                const releasedInfo = mod.dateReleased.split(/[T,Z,.]/);
                const releasedTime = releasedInfo[1];
                const releasedDate = `${mod.dateReleased.substring(5, 10)}-${mod.dateReleased.substring(8, 10)}-${mod.dateReleased.substring(0, 4)}`;

                const modUpdateEmbed = new EmbedBuilder()
                    .setTitle(mod.name)
                    .setAuthor({ name: `${mod.authors[0].name}`, iconURL: mod.categories[0].iconUrl, url: mod.authors[0].url })
                    .setImage(mod.logo.thumbnailUrl)
                    .addFields(
                        { name: `Mod ID `, value: `${mod.id}`, inline: true },
                        { name: 'Mod Downloads', value: `${modDownloadCount}`, inline: true },
                        { name: 'Mod Link', value: `${mod.links.websiteUrl}`, inline: false },
                    )
                    .setFooter({ text: `Updated: ${releasedDate} ${releasedTime}`, iconURL: mod.links.websiteUrl })
                    .setColor(0x00e8ff)
                client.channels.cache.get(config.get(`Servers.${server}.Mod_Channel`)).send({ embeds: [modUpdateEmbed] })
            }
        }
    } catch (error) {
        return
    }
};
