module.exports = (timeCheck);

function timeCheck(callback) {
    try {
        const now = new Date();

        const hour = ("0" + now.getHours()).slice(-2);
        const minute = ("0" + now.getMinutes()).slice(-2);

        var time = (`${hour}:${minute}`);

        return callback(time);
    } catch (error) {
        return
    }
}