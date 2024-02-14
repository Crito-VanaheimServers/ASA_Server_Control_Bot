const config = require('config');
const { EmbedBuilder } = require('discord.js');
const { CurseForgeApi } = require("curseforge-core-api");
const fs = require('fs');
const commaFormat = require("./comma-format");

module.exports = async function modCheck(clients) {
    try {
        var client = clients[0];
        var server = clients[1];

        const ModsApi = new CurseForgeApi({ api_key: (config.get(`ControlBot.Curse_Forge_Token`)) })
        var modarray = JSON.parse("[" + (config.get(`Servers.${server}.Mod_IDs`)) + "]");
        client[4] = false;

        for (let i = 0; i < modarray.length; i++) {
            const { mod, description } = await ModsApi.getMod({
                modId: modarray[i]
            })
            const modDates = fs.readFileSync(`./src/mods/${mod.id}.txt`, { encoding: "utf8" });
            if (modDates === mod.dateReleased) {
            } else {
                var modDownloadCount = mod.downloadCount;
                commaFormat(modDownloadCount, function (response) {
                    modDownloadCount = response;
                });
                var releasedInfo = mod.dateReleased.split(/[T,Z,.]/);
                var releasedTime = releasedInfo[1];
                var releasedDate = (`${mod.dateReleased.charAt(5)}${mod.dateReleased.charAt(6)}-${mod.dateReleased.charAt(8)}${mod.dateReleased.charAt(9)}-${mod.dateReleased.charAt(0)}${mod.dateReleased.charAt(1)}${mod.dateReleased.charAt(2)}${mod.dateReleased.charAt(3)}`);

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

                client[4] = true;
            }
        }
    } catch (error) {
        return
    }
}