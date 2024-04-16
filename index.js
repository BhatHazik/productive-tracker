const activeWin = require("active-win");
const fs = require("fs").promises;
const CDP = require("chrome-remote-interface");

const filePath = "processes.json";
let processCache = []; // Initialize an empty cache

let startTime = Date.now();
const updateTime = 500; // Update time interval in milliseconds (0.5 seconds)
const initialDelay = 5000; // Initial delay of 5 seconds

const productiveApps = ["Microsoft Word", "Microsoft Excel", "Visual Studio Code", "Windows Explorer", "Google Chrome"];

// Load initial data from the file and initialize the cache
const loadInitialData = async () => {
    try {
        const data = await fs.readFile(filePath, "utf8");
        // Parse JSON data and handle empty file
        if (data.trim() === "") {
            processCache = [];
        } else {
            processCache = JSON.parse(data);
        }
    } catch (err) {
        // If file not found or unable to read, initialize an empty array
        if (err.code === 'ENOENT') {
            processCache = [];
        } else {
            console.error("Error reading file:", err);
        }
    }
};

// Save the cache data to the file
const saveData = async () => {
    try {
        const data = JSON.stringify(processCache);
        await fs.writeFile(filePath, data);
    } catch (err) {
        console.error("Error writing file:", err);
    }
};

// Function to get the URL of the active Chrome tab
const getUrl = async () => {
    try {
        const client = await CDP();
        const { Page, Runtime } = client;

        await Promise.all([Page.enable(), Runtime.enable()]);
        const result = await Runtime.evaluate({
            expression: "window.location.href",
        });

        await client.close();
        return result.result.value || "N/A";
    } catch (err) {
        console.error("Error:", err);
        return "N/A";
    }
};

// Function to store data in the cache
const storeData = async (appData) => {
    const existingIndex = processCache.findIndex(
        (entry) => entry.processName === appData.processName
    );

    const currentTime = Date.now();
    const timeSpent = currentTime - startTime;

    if (existingIndex !== -1) {
        // Update existing data
        const prevAppData = processCache[existingIndex];
        prevAppData.timeSpent += timeSpent;
        prevAppData.minuteTimeSpent += timeSpent / 60000;

        if (appData.processName === "Google Chrome") {
            const existingTabIndex = prevAppData.tabs.findIndex(tab => tab.url === appData.url);
            if (existingTabIndex !== -1) {
                prevAppData.tabs[existingTabIndex].timeSpent += timeSpent;
                prevAppData.tabs[existingTabIndex].minuteTimeSpent += timeSpent / 60000;
            } else {
                prevAppData.tabs.push({
                    url: appData.url,
                    timeSpent: timeSpent,
                    minuteTimeSpent: timeSpent / 60000
                });
            }
        }
    } else {
        // Create new data for the process
        appData.productive = productiveApps.includes(appData.processName);
        appData.timeSpent = timeSpent;
        appData.minuteTimeSpent = timeSpent / 60000;

        if (appData.processName === "Google Chrome") {
            appData.tabs = [{
                url: appData.url,
                timeSpent: timeSpent,
                minuteTimeSpent: timeSpent / 60000
            }];
        }

        processCache.push(appData);
    }

    // Save data to the file periodically
    if (processCache.length > 0) {
        await saveData();
    }
};

// Function to monitor the active window and store data
const monitorActiveWindow = async () => {
    try {
        const activeWindow = await activeWin();
        const appData = {};

        const activeAppName = activeWindow.owner.name;

        if (activeAppName.includes("Google Chrome") && activeWindow.platform === "windows") {
            appData.url = await getUrl();
        }

        appData.activeWindow = activeWindow.title;
        appData.processName = activeWindow.owner.name;
        appData.timeStart = new Date().toLocaleString();

        if (Object.keys(appData).length > 0) {
            await storeData(appData);
        }

        // Update start time for the next interval
        startTime = Date.now();
    } catch (error) {
        console.error("Error occurred:", error);
    }

    // Call the function again after the updateTime
    setTimeout(monitorActiveWindow, updateTime);
};

// Initial setup
(async () => {
    await loadInitialData();
    // Introduce a 5-second delay before starting monitoring
    setTimeout(() => {
        monitorActiveWindow();
    }, initialDelay);
})();




// worked well but it is giving error sometimes

// const activeWin = require("active-win");
// const fs = require("fs").promises;
// const CDP = require("chrome-remote-interface");

// const filePath = "processes.json";
// let processCache = []; // Initialize an empty cache

// let startTime = Date.now();
// const updateTime = 500; // Update time interval in milliseconds (0.5 seconds)

// const productiveApps = ["Microsoft Word", "Microsoft Excel", "Visual Studio Code", "Windows Explorer", "Google Chrome"];

// // Load initial data from the file and initialize the cache
// const loadInitialData = async () => {
//     try {
//         const data = await fs.readFile(filePath, "utf8");
//         processCache = JSON.parse(data);
//     } catch (err) {
//         console.error("Error reading file:", err);
//         processCache = [];
//     }
// };

// // Save the cache data to the file
// const saveData = async () => {
//     try {
//         const data = JSON.stringify(processCache);
//         await fs.writeFile(filePath, data);
//     } catch (err) {
//         console.error("Error writing file:", err);
//     }
// };

// // Function to get the URL of the active Chrome tab
// const getUrl = async () => {
//     try {
//         const client = await CDP();
//         const { Page, Runtime } = client;

//         await Promise.all([Page.enable(), Runtime.enable()]);
//         const result = await Runtime.evaluate({
//             expression: "window.location.href",
//         });

//         await client.close();
//         return result.result.value || "N/A";
//     } catch (err) {
//         console.error("Error:", err);
//         return "N/A";
//     }
// };

// // Function to store data in the cache
// const storeData = async (appData) => {
//     const existingIndex = processCache.findIndex(
//         (entry) => entry.processName === appData.processName
//     );

//     const currentTime = Date.now();
//     const timeSpent = currentTime - startTime;

//     if (existingIndex !== -1) {
//         // Update existing data
//         const prevAppData = processCache[existingIndex];
//         prevAppData.timeSpent += timeSpent;
//         prevAppData.minuteTimeSpent += timeSpent / 60000;

//         if (appData.processName === "Google Chrome") {
//             const existingTabIndex = prevAppData.tabs.findIndex(tab => tab.url === appData.url);
//             if (existingTabIndex !== -1) {
//                 prevAppData.tabs[existingTabIndex].timeSpent += timeSpent;
//                 prevAppData.tabs[existingTabIndex].minuteTimeSpent += timeSpent / 60000;
//             } else {
//                 prevAppData.tabs.push({
//                     url: appData.url,
//                     timeSpent: timeSpent,
//                     minuteTimeSpent: timeSpent / 60000
//                 });
//             }
//         }
//     } else {
//         // Create new data for the process
//         appData.productive = productiveApps.includes(appData.processName);
//         appData.timeSpent = timeSpent;
//         appData.minuteTimeSpent = timeSpent / 60000;

//         if (appData.processName === "Google Chrome") {
//             appData.tabs = [{
//                 url: appData.url,
//                 timeSpent: timeSpent,
//                 minuteTimeSpent: timeSpent / 60000
//             }];
//         }

//         processCache.push(appData);
//     }

//     // Save data to the file periodically
//     if (processCache.length > 0) {
//         await saveData();
//     }
// };

// // Function to monitor the active window and store data
// const monitorActiveWindow = async () => {
//     try {
//         const activeWindow = await activeWin();
//         const appData = {};

//         const activeAppName = activeWindow.owner.name;

//         if (activeAppName.includes("Google Chrome") && activeWindow.platform === "windows") {
//             appData.url = await getUrl();
//         }

//         appData.activeWindow = activeWindow.title;
//         appData.processName = activeWindow.owner.name;
//         appData.timeStart = new Date().toLocaleString();

//         if (Object.keys(appData).length > 0) {
//             await storeData(appData);
//         }

//         // Update start time for the next interval
//         startTime = Date.now();
//     } catch (error) {
//         console.error("Error occurred:", error);
//     }

//     // Call the function again after the updateTime
//     setTimeout(monitorActiveWindow, updateTime);
// };

// // Initial setup
// (async () => {
//     await loadInitialData();
//     // Introduce a 5-second delay before starting monitoring
//     setTimeout(() => {
//         monitorActiveWindow();
//     }, 5000);
// })();






// worked but 15s late

// const activeWin = require("active-win");
// const fs = require("fs");
// const CDP = require("chrome-remote-interface");

// const filePath = "processes.json";

// let startTime = Date.now(); // Global variable to track start time
// const updateTime = 5000; // Update time interval in milliseconds

// const productiveApps = ["Microsoft Word", "Microsoft Excel", "Visual Studio Code", "Windows Explorer", "Google Chrome"]; // Array of productive apps

// // Initialize a cache for data
// let processCache = {};

// // Function to read data from the file and store it in the cache
// const readData = async () => {
//     try {
//         const data = await fs.promises.readFile(filePath, "utf8");
//         processCache = JSON.parse(data);
//     } catch (err) {
//         console.error("Error reading file:", err);
//         processCache = [];
//     }
// };

// // Function to save data from the cache to the file
// const saveData = async () => {
//     try {
//         const data = JSON.stringify(processCache);
//         await fs.promises.writeFile(filePath, data);
//     } catch (err) {
//         console.error("Error writing file:", err);
//     }
// };

// // Get the URL of the active Chrome tab
// const getUrl = async () => {
//     try {
//         const client = await CDP();

//         // Extract necessary domains
//         const { Page, Runtime } = client;

//         // Enable necessary domains
//         await Promise.all([Page.enable(), Runtime.enable()]);

//         // Evaluate script to get the current URL
//         const result = await Runtime.evaluate({
//             expression: "window.location.href",
//         });

//         await client.close();
//         return result.result.value || "N/A";
//     } catch (err) {
//         console.error("Error:", err);
//         return "N/A";
//     }
// };

// // Store data in the cache and handle timing correctly
// const storeData = async (appData) => {
//     const existingIndex = processCache.findIndex(
//         (entry) => entry.processName === appData.processName
//     );

//     let currentTime = Date.now();
//     let timeSpent = currentTime - startTime;

//     if (existingIndex !== -1) {
//         // Process already exists in the cache
//         const prevAppData = processCache[existingIndex];
//         prevAppData.timeSpent += timeSpent;
//         prevAppData.minuteTimeSpent += timeSpent / 60000; // Convert milliseconds to minutes
//         prevAppData.productive = productiveApps.includes(appData.processName);

//         if (appData.processName === "Google Chrome") {
//             // Handle Chrome URL
//             const existingTabIndex = prevAppData.tabs.findIndex(tab => tab.url === appData.url);
//             if (existingTabIndex === -1) {
//                 // Add new tab if not found
//                 prevAppData.tabs.push({
//                     url: appData.url,
//                     timeSpent: timeSpent,
//                     minuteTimeSpent: timeSpent / 60000
//                 });
//             } else {
//                 // Update existing tab's time spent
//                 prevAppData.tabs[existingTabIndex].timeSpent += timeSpent;
//                 prevAppData.tabs[existingTabIndex].minuteTimeSpent += timeSpent / 60000;
//             }
//         }
//     } else {
//         // Create a new entry for the process
//         appData.productive = productiveApps.includes(appData.processName);
//         appData.timeSpent = timeSpent;
//         appData.minuteTimeSpent = timeSpent / 60000;

//         if (appData.processName === "Google Chrome") {
//             // Initialize tabs array with the URL
//             appData.tabs = [{
//                 url: appData.url,
//                 timeSpent: timeSpent,
//                 minuteTimeSpent: timeSpent / 60000
//             }];
//         }

//         processCache.push(appData);
//     }

//     // Save data periodically
//     if (processCache.length > 0) {
//         await saveData();
//     }
// };

// // Function to monitor the active window and store data
// const monitorActiveWindow = async () => {
//     try {
//         const activeWindow = await activeWin();
//         const appData = {};

//         const activeAppName = activeWindow.owner.name;

//         if (activeAppName.includes("Google Chrome") && activeWindow.platform === "windows") {
//             appData.url = await getUrl(); // Retrieve URL for Google Chrome
//         }

//         appData.activeWindow = activeWindow.title;
//         appData.processName = activeWindow.owner.name;
//         appData.timeStart = new Date().toLocaleString();

//         // Only store data if the appData object is not empty
//         if (Object.keys(appData).length > 0) {
//             await storeData(appData);
//         }

//         // Update start time for the next interval
//         startTime = Date.now();
//     } catch (error) {
//         console.error("Error occurred:", error);
//     }

//     // Call the function again after updateTime
//     setTimeout(monitorActiveWindow, updateTime);
// };

// // Initial setup
// (async () => {
//     await readData(); // Load initial data from the file
//     setTimeout(monitorActiveWindow, updateTime); // Start monitoring
// })();





















// const activeWin = require("active-win");
// const fs = require("fs");
// const CDP = require("chrome-remote-interface");

// const filePath = "processes.json";

// let startTime = Date.now(); // Global variable to track start time
// const updateTime = 5000; // Update time interval in milliseconds

// const productiveApps = ["Microsoft Word", "Microsoft Excel", "Visual Studio Code", "Windows Explorer", "Google Chrome"]; // Array of productive apps

// const getUrl = async () => {
//   try {
//     const client = await CDP();

//     // Extract necessary domains
//     const { Page, Runtime } = client;

//     // Enable necessary domains
//     await Promise.all([Page.enable(), Runtime.enable()]);

//     // Evaluate script to get current URL
//     const result = await Runtime.evaluate({
//       expression: "window.location.href",
//     });

//     await client.close();
//     return result.result.value || "N/A"; // Return "N/A" if URL is not available
//   } catch (err) {
//     console.error("Error:", err);
//     return "N/A"; // Return "N/A" if an error occurs
//   }
// };

// const storeData = async (appData) => {
//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) {
//       console.error("Error reading file:", err);
//       return;
//     }

//     try {
//       const jsonData = JSON.parse(data);
//       const existingIndex = jsonData.findIndex(
//         (entry) => entry.processName === appData.processName
//       );
//       if (existingIndex !== -1) {
//         let timeStart = Date.now();
//         const prevAppData = jsonData[existingIndex];
//         var timeSpent = ((timeStart - startTime) * 5) - 0.90;
//         var minuteTimeSpent = timeSpent / 60;
//         prevAppData.timeSpent += timeSpent;
//         prevAppData.minuteTimeSpent += minuteTimeSpent;
//         prevAppData.productive = productiveApps.includes(appData.processName); // Check if the process is productive

//         if (appData.processName === "Google Chrome") {
//           // Check if the URL already exists in the tabs array
//           const existingTabIndex = prevAppData.tabs.findIndex(tab => tab.url === appData.url);
//           if (existingTabIndex === -1) {
//             // If URL doesn't exist, add it to the tabs array
//             prevAppData.tabs.push({ 
//               url: appData.url, 
//               timeSpent: timeSpent, // Update timeSpent for the tab
//               minuteTimeSpent: minuteTimeSpent // Calculate minuteTimeSpent for the tab
//             });
//           }
//         }
//       } else {
//         // If process doesn't exist, create a new entry
//         appData.productive = productiveApps.includes(appData.processName); // Check if the process is productive
//         if (appData.processName === "Google Chrome") {
//           // For Chrome, initialize tabs array with the URL
//           appData.tabs = [{ 
//             url: appData.url, 
//             timeSpent: timeSpent, // Update timeSpent for the tab
//             minuteTimeSpent: minuteTimeSpent // Calculate minuteTimeSpent for the tab
//           }];
//           delete appData.url; // Remove top-level URL key
//         }
//         jsonData.push(appData);
//       }

//       let d = JSON.stringify(jsonData);
//       fs.writeFileSync(filePath, d);
//     } catch (parseError) {
//       console.error("Error parsing JSON data:", parseError);
//     }
//   });
// };

// async function monitorActiveWindow() {
//   try {
//     const activeWindow = await activeWin();
//     const appData = {};

//     const activeAppName = activeWindow.owner.name;
//     if (
//       activeAppName.includes("Google Chrome") &&
//       activeWindow.platform === "windows"
//     ) {
//       appData.url = await getUrl(); // Retrieve URL for Google Chrome
//     }

//     appData.activeWindow = activeWindow.title;
//     appData.processName = activeWindow.owner.name;
//     appData.timeStart = new Date().toLocaleString();

//     // Store the data for the previous app
//     if (Object.keys(appData).length !== 0) {
//       storeData(appData);
//     }

//     startTime = Date.now(); // Update start time for the current app
//   } catch (error) {
//     console.error("Error occurred:", error);
//   }

//   setTimeout(monitorActiveWindow, updateTime); // Call the function again after updateTime
// }

// setTimeout(monitorActiveWindow, updateTime); // Initial call to start the monitoring after updateTime






