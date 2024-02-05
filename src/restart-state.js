let activeRestart = false;

module.exports = {
    getRestartState: () => activeRestart,
    setRestartState: (value) => { activeRestart = value; }
};