const config = require('config');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const commaFormat = require("./comma-format");
const modChangeLog = require("./mod-changelog.js");
const path = require('path');
const axios = require('axios');

module.exports = async function modCheck(clients) {
    try {
        const serverClient = clients[0][0];

        const servers = config.get('Servers');
        const modIDsSet = new Set();

        for (const serverKey in servers) {
            const server = servers[serverKey];
            const modIDs = server.Mod_IDs.split(',').map(id => id.trim());
            modIDs.forEach(id => modIDsSet.add(id));
        }

        const allModIDs = Array.from(modIDsSet);
        const API_KEY = config.get('ControlBot.Curse_Forge_Token');
        const folderPath = './src/mods'; // Folder path

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
            .then(async function (res) {
                if (res.data && res.data.data && Array.isArray(res.data.data)) {
                    for (const mod of res.data.data) {
                        const fileName = `${mod.id}.txt`;
                        const filePath = path.join(folderPath, fileName);

                        try {
                            const fileContent = await fs.promises.readFile(filePath, 'utf8');
                            const fileModData = JSON.parse(fileContent);
                            const modId = mod.id;

                            if (fileModData.dateReleased !== mod.dateReleased) {

                                for (let i = 0; i < clients.length; i++) {
                                    const clientMods = config.get(`Servers.${clients[i][1]}.Mod_IDs`);
                                    if (clientMods.includes(modId)) {
                                        clients[i][4][0].push(`${modId}`);
                                    }
                                }

                                let modDownloadCount = mod.downloadCount;
                                commaFormat(modDownloadCount, response => {
                                    modDownloadCount = response.toString();
                                });
                                const releasedInfo = mod.dateReleased.split(/[T,Z,.]/);
                                const releasedTime = releasedInfo[1];
                                const releasedDate = `${mod.dateReleased.substring(5, 7)}-${mod.dateReleased.substring(8, 10)}-${mod.dateReleased.substring(0, 4)}`;
                                const fileId = mod.latestFiles[0].id;
                                const modLog = await modChangeLog({ modId, fileId });
                                let formattedModLog = modLog.data;

                                const hasPattern = /<br>|<\/?p>|-/.test(modLog.data);

                                if (hasPattern) {
                                    formattedModLog = formattedModLog
                                        .replace(/<br>/g, '\n')
                                        .replace(/<\/?p>/g, '')
                                        .replace(/-/g, '\n-');
                                }

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
                                        { name: `Mod ID`, value: '`' + `${mod.id}` + '`', inline: true },
                                        { name: 'Mod Downloads', value: '`' + `${modDownloadCount}` + '`', inline: true },
                                        { name: 'Mod Link', value: `${mod.links.websiteUrl}`, inline: false },
                                    )
                                    .setFooter({ text: `Updated: ${releasedDate} ${releasedTime}`, iconURL: mod.links.websiteUrl })
                                    .setColor(0x00e8ff);

                                for (const chunk of chunks) {
                                    modUpdateEmbed.addFields({ name: 'Mod Change Notes', value: '```' + chunk + '```', inline: false });
                                }

                                serverClient.channels.cache.get(config.get(`ControlBot.Mod_Channel`)).send({ embeds: [modUpdateEmbed] });
                            }
                        } catch (err) {
                            console.error(`Error reading file ${filePath}:`, err);
                        }
                    }
                } else {
                    console.error('Mods invalid response data');
                }
            })
            .catch(function (error) {
                console.error('Error:', error);
            });
    } catch (error) {
        console.log(error);
    }
};
