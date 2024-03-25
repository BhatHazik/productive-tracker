const fs = require("fs");
const filePath = "processes.json";
const storeData = async (appData) => {
    let startTime = Date.now();
    const productiveApps = ["Microsoft Word", "Microsoft Excel", "Visual Studio Code", "Windows Explorer", "Google Chrome"]; // Array of productive apps
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }
  
      try {
        const jsonData = JSON.parse(data);
        const existingIndex = jsonData.findIndex(
          (entry) => entry.processName === appData.processName
        );
        if (existingIndex !== -1) {
          let timeStart = Date.now();
          const prevAppData = jsonData[existingIndex];
          var timeSpent = (((timeStart) - (startTime)) * 5) - 0.90 ;
          var minuteTimeSpent = timeSpent / 60;
          prevAppData.timeSpent += timeSpent;
          prevAppData.minuteTimeSpent += minuteTimeSpent;
          prevAppData.productive = productiveApps.includes(appData.processName); // Check if the process is productive
  
          if (appData.processName === "Google Chrome") {
            // Check if the URL already exists in the tabs array
            const existingTabIndex = prevAppData.tabs.findIndex(tab => tab.url === appData.url);
            if (existingTabIndex === -1) {
              // If URL doesn't exist, add it to the tabs array
              prevAppData.tabs.push({ 
                url: appData.url, 
                timeSpent: timeSpent, // Update timeSpent for the tab
                minuteTimeSpent: minuteTimeSpent // Calculate minuteTimeSpent for the tab
              });
            }
          }
        } else {
          // If process doesn't exist, create a new entry
          appData.productive = productiveApps.includes(appData.processName); // Check if the process is productive
          if (appData.processName === "Google Chrome") {
            // For Chrome, initialize tabs array with the URL
            appData.tabs = [{ 
              url: appData.url, 
              timeSpent: timeSpent, // Update timeSpent for the tab
              minuteTimeSpent: minuteTimeSpent // Calculate minuteTimeSpent for the tab
            }];
            delete appData.url; // Remove top-level URL key
          }
          jsonData.push(appData);
        }
  
        let d = JSON.stringify(jsonData);
        fs.writeFileSync(filePath, d);
      } catch (parseError) {
        console.error("Error parsing JSON data:", parseError);
      }
    });
  };
  module.exports = storeData