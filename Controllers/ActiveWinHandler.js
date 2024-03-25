// const activeWin = require("active-win");
// const getUrl = require('../Controllers/GetUrlHandler');
// const storeData = require('../Controllers/StoreDataHandler');

// let isMonitoring = false;
// const updateTime = 5000; // Update time interval in milliseconds

// const startMonitoring = async () => {
//     isMonitoring = true;
    
//     while (isMonitoring) {
//         try {
//             const activeWindow = await activeWin();
//             const appData = {};

//             const activeAppName = activeWindow.owner.name;
//             if (
//                 activeAppName.includes("Google Chrome") &&
//                 activeWindow.platform === "windows"
//             ) {
//                 appData.url = await getUrl(); // Retrieve URL for Google Chrome
//             }

//             appData.activeWindow = activeWindow.title;
//             appData.processName = activeWindow.owner.name;
//             appData.timeStart = new Date().toLocaleString();

//             // Store the data for the previous app
//             if (Object.keys(appData).length !== 0) {
//                 storeData(appData);
//             }
//         } catch (error) {
//             console.error("Error occurred:", error);
//         }

//         // Wait for updateTime before checking again
//         await new Promise(resolve => setTimeout(resolve, updateTime));
//     }
// };

// const stopMonitoring = () => {
//     isMonitoring = false;
// };

// module.exports = { startMonitoring, stopMonitoring };

























const activeWin = require("active-win");
const getUrl = require('../Controllers/GetUrlHandler');
const storeData = require('../Controllers/StoreDataHandler');


let startTime = Date.now(); // Global variable to track start time
const updateTime = 5000; // Update time interval in milliseconds





const monitorActiveWindow = async(req, res) => {
  
  try {
    const activeWindow = await activeWin();
    const appData = {};

    const activeAppName = activeWindow.owner.name;
    if (
      activeAppName.includes("Google Chrome") &&
      activeWindow.platform === "windows"
    ) {
      appData.url = await getUrl(); // Retrieve URL for Google Chrome
    }

    appData.activeWindow = activeWindow.title;
    appData.processName = activeWindow.owner.name;
    appData.timeStart = new Date().toLocaleString();

    // Store the data for the previous app
    if (Object.keys(appData).length !== 0) {
      storeData(appData);
    }

    startTime = Date.now(); // Update start time for the current app
  } catch (error) {
    console.error("Error occurred:", error);
  }

  setTimeout(monitorActiveWindow, updateTime); // Call the function again after updateTime
  
}
setTimeout(monitorActiveWindow, updateTime);

 // Initial call to start the monitoring after updateTime

module.exports = monitorActiveWindow;
