const config = require('config');

module.exports = (restartTimeConv);

function restartTimeConv(callback) {
    try {
        var targetHr = config.get(`ControlBot.Restart_Hour`);

        if (targetHr === "00") {
            targetHr = "24";
        };

        targetHr = targetHr - "01";
        targetHr = ("0" + targetHr).slice(-2);
        var restartTime = `${targetHr}:45`;

        return callback(restartTime);
    } catch (error) {
        return
    }
}