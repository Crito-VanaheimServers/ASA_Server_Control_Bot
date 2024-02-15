const config = require('config');
const { ButtonBuilder, ButtonStyle } = require('discord.js');
const buttonbuild = require("./buttons-build");

module.exports = (buttonsInfo);

async function buttonsInfo(clients) {
    try {
        for (let i = 0; i < clients.length; i++) {
        var server = clients[i][1];
        var client = clients[i][0];

        var IDName = config.get(`Servers.${server}.Game_Server_Name`).toLowerCase().replace(/\s+/g, '_');

        const server1Buttons = [
            {
                id: `${IDName}_start`,
                label: 'START',
                style: ButtonStyle.Success,
                emoji: '🛰️'
            },
            {
                id: `${IDName}_stop`,
                label: 'SHUTDOWN',
                style: ButtonStyle.Danger,
                emoji: '🛑'
            },
            {
                id: `${IDName}_restart`,
                label: 'RESTART',
                style: ButtonStyle.Primary,
                emoji: '🔄'
            },
            {
                id: `${IDName}_restartwarn`,
                label: 'WARNING & RESTART',
                style: ButtonStyle.Primary,
                emoji: '⚠️'
            },
            {
                id: `${IDName}_stopwarn`,
                label: 'WARNING & SHUTDOWN',
                style: ButtonStyle.Danger,
                emoji: '📢'
            },
            {
                id: `${IDName}_cancelwarn`,
                label: 'CANCEL WARNING',
                style: ButtonStyle.Primary,
                emoji: '❌'
            },
            {
                id: `${IDName}_dinodestroy`,
                label: 'DESTROY WILD DINOS',
                style: ButtonStyle.Primary,
                emoji: '☠️'
            },
        ]

        var channel = client.channels.cache.get(config.get(`Servers.${server}.Admin_Channel_ID`));
        if (!channel) {
            console.log("Button Channel Not Found!!")
            return;
        }

        const messages = await channel.messages.fetch();

        const buttons = [];
        for (let a = 0; a < server1Buttons.length; ++a) {
            buttons.push(

                new ButtonBuilder()
                    .setCustomId(server1Buttons[a].id)
                    .setLabel(server1Buttons[a].label)
                    .setStyle(server1Buttons[a].style)
                    .setEmoji(server1Buttons[a].emoji)
            )
        }

        const messageObject = {
            content: `${config.get(`Servers.${server}.Game_Server_Name`)} Controls\nRCON commands: use / key and select appropriate server to send your rcon command `,
            components: buttonbuild(buttons),
        }

        const specificWord = `${config.get(`Servers.${server}.Game_Server_Name`)}`;
        const botMessages = messages.filter(
            (message) => message.content.includes(specificWord)
        );
        botMessages.forEach(message => {
            message.delete().catch(error => {
                console.error('Error deleting message:', error);
            });
        });

        await channel.send(messageObject);
    }
    } catch (error) {
        console.error('Error:', error);
        return
    }
}