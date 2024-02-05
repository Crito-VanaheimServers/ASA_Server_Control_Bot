require('dotenv').config();
const { EmbedBuilder } = require('discord.js');
const rconCall = require('./rcon-call');

module.exports = (gameChat);

function gameChat(client) {
    try {
        rconCall('GetChat', function (response) {
            if (`${response}`.trim() === 'Server received, But no response!!') {
                return;
            } else {
                var chatTrim = `${response}`.trim();
                var chatSplit = chatTrim.split(/[\n]/);
                for (let i = 0; i < chatSplit.length; i++) {
                    var PlyrChat = chatSplit[i];
                    if (PlyrChat.includes('(From Discord)')) {
                        return
                    } else {
                        if (PlyrChat.includes('AdminCmd')) {
                            console.log(`${PlyrChat}`);
                            return
                        } else {
                            const gameChatEmbed = new EmbedBuilder()
                                .addFields({ name: 'GAME CHAT:', value: `${PlyrChat}` })
                                .setColor(0x00e8ff);
                            client.channels.cache.get(process.env.Chat_Channel_ID).send({ embeds: [gameChatEmbed] });
                            console.log(`${PlyrChat}`);
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error in gameChat function:', error);
    }
}