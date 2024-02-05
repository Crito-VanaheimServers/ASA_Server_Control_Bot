require('dotenv').config();
const { ButtonBuilder, ButtonStyle } = require('discord.js');
const buttonbuild = require("./buttons-build");

module.exports = (buttonsInfo);

function buttonsInfo(client) {
    (async function () {
        try {
            const server1Buttons = [
                {
                    id: 'start',
                    lable: 'START',
                    style: ButtonStyle.Success,
                    emoji: '🛰️'
                },
                {
                    id: 'stop',
                    lable: 'SHUTDOWN',
                    style: ButtonStyle.Danger,
                    emoji: '🛑'
                },
                {
                    id: 'restart',
                    lable: 'RESTART',
                    style: ButtonStyle.Primary,
                    emoji: '🔄'
                },
                {
                    id: 'restartwarn',
                    lable: 'WARNING & RESTART',
                    style: ButtonStyle.Success,
                    emoji: '⚠️'
                },
                {
                    id: 'stopwarn',
                    lable: 'WARNING & SHUTDOWN',
                    style: ButtonStyle.Danger,
                    emoji: '📢'
                },
                {
                    id: 'cancelwarn',
                    lable: 'CANCEL WARNING',
                    style: ButtonStyle.Primary,
                    emoji: '❌'
                },
                {
                    id: 'dinodestroy',
                    lable: 'DESTROY WILD DINOS',
                    style: ButtonStyle.Primary,
                    emoji: '☠️'
                },
            ]

            const channel = client.channels.cache.get(`${process.env.Admin_Channel_ID}`);
            if (!channel) {
                console.log("Button Channel Not Found!!")
                return;
            }

            const messages = await channel.messages.fetch();

            const first = messages.first();

            const buttons = [];
            for (let a = 0; a < server1Buttons.length; ++a) {
                buttons.push(

                    new ButtonBuilder()
                        .setCustomId(server1Buttons[a].id)
                        .setLabel(server1Buttons[a].lable)
                        .setStyle(server1Buttons[a].style)
                        .setEmoji(server1Buttons[a].emoji)
                )
            }

            const messageObject = {
                content: `${process.env.Message_Tittle} Controls\nRCON commands: send as a normal message, no quotes`,
                components: buttonbuild(buttons),
            }

            const specificWord = `${process.env.Message_Tittle}`;

            const botMessages = messages.filter(
                (message) => message.content.includes(specificWord)
            );
            botMessages.forEach(message => {
                message.delete().catch(error => {
                    console.error('Error deleting message:', error);
                });
            });

            channel.send(messageObject)
            return
        } catch (error) {
            return
        }
    })();
}