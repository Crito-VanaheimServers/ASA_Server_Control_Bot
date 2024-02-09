require('dotenv').config();
const rconCall = require('./rcon-call');

module.exports = (discordChat);

function discordChat(chatMessage) {
    try {
        var message = chatMessage.content;
        var sender = chatMessage.author.globalName;
        var messageToSend = `(From Discord) ${sender}: ${message}`;

        if (chatMessage.author.bot) {
            return
        } else {
            rconCall(`ServerChat ${messageToSend}`, function (response) {
                if(response){
                    console.log(`${messageToSend}`);
                }
            });
        }
    } catch (error) {
        console.error('Error in discordChat:', error);
    }
}
