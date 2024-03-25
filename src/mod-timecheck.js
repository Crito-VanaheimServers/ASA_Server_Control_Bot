module.exports = (modTimeCheck);

function modTimeCheck() {
    return new Promise((resolve, reject) => {
        try {
            const now = new Date();
            now.setMinutes(now.getMinutes() + 10);
            const hour = ("0" + now.getHours()).slice(-2);
            const minute = ("0" + now.getMinutes()).slice(-2);
            var time = `${hour}:${minute}`;
            resolve(time);
        } catch (error) {
            console.error('Error in modTimeCheck function:', error);
            reject('Error in modTimeCheck function');
        }
    });
}