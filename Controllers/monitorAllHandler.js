const monitorActiveWindow = require('./ActiveWinHandler');

const startMonitoring = () => {
    monitorActiveWindow()
    setTimeout(monitorActiveWindow() , 5000)
};

module.exports = startMonitoring;
