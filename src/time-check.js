module.exports = (timeCheck);

function timeCheck() {
    return new Promise((resolve, reject) => {
        try {
            const now = new Date();
            const hour = ("0" + now.getHours()).slice(-2);
            const minute = ("0" + now.getMinutes()).slice(-2);
            var time = `${hour}:${minute}`;
            resolve(time);
        } catch (error) {
            console.error('Error in timeCheck function:', error);
            reject('Error in timeCheck function');
        }
    });
}