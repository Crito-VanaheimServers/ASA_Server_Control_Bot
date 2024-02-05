module.exports = (commaFormat);

function commaFormat(x, callback) {
    try {
        return callback(x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    } catch (error) {
        return
    }
}