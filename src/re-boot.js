require('dotenv').config();
const { EmbedBuilder } = require('discord.js');

module.exports = (reBoot);

function reBoot([client, commandSender]) {
    try {
        const status = new EmbedBuilder()
            .setTitle(process.env.Message_Tittle)
            .addFields({ name: (`${commandSender}`), value: (`Starting ${process.env.Message_Tittle} server please wait ....`) })
            .setColor(0x00e8ff)
        client.channels.cache.get((process.env.Admin_Channel_ID)).send({ embeds: [status] });
        console.log(`Starting ${process.env.Message_Tittle} server please wait ....`);
    } catch (error) {
        return
    }
}