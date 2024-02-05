let cancelRestart = false;

module.exports = {
    getCancelState: () => cancelRestart,
    setCancelState: (value) => { cancelRestart = value; }
};