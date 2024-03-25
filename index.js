const express = require('express');
// const cors = require('cors')
const monitor = require('./Controllers/ActiveWinHandler')
const app = express();                      
const port =  4000; 


// app.use(cors())




app.get('/start-monitoring', (req, res) => {
  monitor
  res.send('Monitoring started');
});

// Route to stop monitoring
// app.get('/stop-monitoring', (req, res) => {
//   monitor.stopMonitoring();
//   res.send('Monitoring stopped');
// });




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});














































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
//         const timeSpent = (((timeStart) - (startTime)) * 5) - 0.90 ;
//         const minuteTimeSpent = timeSpent / 60;
//         prevAppData.timeSpent += timeSpent;
//         prevAppData.minuteTimeSpent += minuteTimeSpent;
//         prevAppData.productive = productiveApps.includes(appData.processName); // Check if the process is productive

//         if (appData.processName === "Google Chrome") {
//           // Check if the URL already exists in the tabs array
//           const existingTabIndex = prevAppData.tabs.findIndex(tab => tab.url === appData.url);
//           if (existingTabIndex === -1) {
//             // If URL doesn't exist, add it to the tabs array
//             prevAppData.tabs.push({ url: appData.url, timeSpent });
//           }
//         }
//       } else {
//         // If process doesn't exist, create a new entry
//         appData.productive = productiveApps.includes(appData.processName); // Check if the process is productive
//         if (appData.processName === "Google Chrome") {
//           // For Chrome, initialize tabs array with the URL
//           appData.tabs = [{ url: appData.url, timeSpent: 0 }];
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
//         const timeSpent = (((timeStart) - (startTime)) * 5) - 0.90 ;
//         const minuteTimeSpent = timeSpent / 60;
//         prevAppData.timeSpent += timeSpent;
//         prevAppData.minuteTimeSpent += minuteTimeSpent;
//         prevAppData.productive = productiveApps.includes(appData.processName); // Check if the process is productive

//         if (appData.processName === "Google Chrome") {
//           // For Chrome, add the URL to the tabs array
//           prevAppData.tabs.push({ url: appData.url, timeSpent });
//         }
//       } else {
//         // If process doesn't exist, create a new entry
//         appData.productive = productiveApps.includes(appData.processName); // Check if the process is productive
//         if (appData.processName === "Google Chrome") {
//           // For Chrome, initialize tabs array with the URL
//           appData.tabs = [{ url: appData.url, timeSpent: 0 }];
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
//         const timeSpent = (((timeStart) - (startTime)) * 5) - 0.90 ;
//         const minuteTimeSpent = timeSpent / 60;
//         prevAppData.timeSpent += timeSpent;
//         prevAppData.minuteTimeSpent += minuteTimeSpent;
//         prevAppData.productive = productiveApps.includes(appData.processName); // Check if the process is productive
//         // Check if the URL already exists for this process
//         const existingUrlIndex = prevAppData.urls.findIndex(
//           (urlEntry) => urlEntry.url === appData.url
//         );
//         if (existingUrlIndex !== -1) {
//           // If URL exists, update time spent
//           const urlEntry = prevAppData.urls[existingUrlIndex];
//           urlEntry.timeSpent += timeSpent;
//         } else {
//           // If URL doesn't exist, add a new entry
//           prevAppData.urls.push({ url: appData.url, timeSpent });
//         }
//       } else {
//         // If process doesn't exist, create a new entry
//         appData.productive = productiveApps.includes(appData.processName); // Check if the process is productive
//         appData.urls = [{ url: appData.url, timeSpent: 0 }];
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
//         const timeSpent = (((timeStart) - (startTime)) * 5) - 0.90 ;
//         const minuteTimeSpent = timeSpent / 60;
//         prevAppData.timeSpent += timeSpent;
//         prevAppData.minuteTimeSpent += minuteTimeSpent;
//         prevAppData.productive = productiveApps.includes(appData.processName); // Check if the process is productive
//         prevAppData.url = appData.url; // Ensure URL is stored even for existing entries
//       } else {
//         appData.productive = productiveApps.includes(appData.processName); // Check if the process is productive
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
//         const timeSpent = (((timeStart) - (startTime)) * 5) - 0.90 ;
//         const minuteTimeSpent = timeSpent / 60;
//         prevAppData.timeSpent += timeSpent;
//         prevAppData.minuteTimeSpent += minuteTimeSpent;
//         prevAppData.productive = productiveApps.includes(appData.processName); // Check if the process is productive
//         prevAppData.url = appData.url; // Ensure URL is stored even for existing entries
//       } else {
//         appData.productive = productiveApps.includes(appData.processName); // Check if the process is productive
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
//     return result.result.value;
//   } catch (err) {
//     console.error("Error:", err);
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
//         const timeSpent = (((timeStart) - (startTime)) * 5) - 0.90 ;
//         const minuteTimeSpent = timeSpent / 60;
//         prevAppData.timeSpent += timeSpent;
//         prevAppData.minuteTimeSpent += minuteTimeSpent;
//         prevAppData.productive = productiveApps.includes(appData.processName); // Check if the process is productive
//       } else {
//         appData.productive = productiveApps.includes(appData.processName); // Check if the process is productive
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
//       const url = await getUrl();
//       appData.url = url;
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
 


















































// const activeWin = require("active-win");
// const fs = require("fs");
// const CDP = require("chrome-remote-interface");

// const filePath = "processes.json";

// let startTime = Date.now(); // Global variable to track start time
// const updateTime = 5000; // Update time interval in milliseconds

// const productiveApps = ["Visual Studio Code", "Microsoft Excel", "Postman", "Windows Explorer", "Chrome"];
// const productiveWebsites = ["google.com", "productive.com"];

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
//     return result.result.value;
//   } catch (err) {
//     console.error("Error:", err);
//   }
// };

// const isProductiveApp = (appName) => {
//   return productiveApps.includes(appName);
// };

// const isProductiveWebsite = (url) => {
//   return productiveWebsites.some((productiveUrl) => url.includes(productiveUrl));
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
//         const timeSpent = (((timeStart) - (startTime)) * 5) - 0.90;
//         const minuteTimeSpent = timeSpent / 60;
//         prevAppData.timeSpent += timeSpent;
//         prevAppData.minuteTimeSpent += minuteTimeSpent;
//       } else {
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
//       const url = await getUrl();
//       appData.url = url;
//       appData.productive = isProductiveWebsite(url);
//     } else {
//       appData.productive = isProductiveApp(activeAppName);
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

















// const activeWin = require("active-win");
// const fs = require("fs");
// const CDP = require("chrome-remote-interface");

// const filePath = "processes.json";

// let startTime = Date.now(); // Global variable to track start time
// const updateTime = 5000; // Update time interval in milliseconds

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
//     return result.result.value;
//   } catch (err) {
//     console.error("Error:", err);
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
//         const timeSpent = (((timeStart) - (startTime)) * 5) - 0.90 ;
//         const minuteTimeSpent = timeSpent / 60
//         prevAppData.timeSpent += timeSpent;
//         prevAppData.minuteTimeSpent += minuteTimeSpent;
//       } else {
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
//       const url = await getUrl();
//       appData.url = url;
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
