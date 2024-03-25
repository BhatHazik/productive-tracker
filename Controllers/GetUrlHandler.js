const CDP = require("chrome-remote-interface");
const getUrl = async () => {

    try {
      const client = await CDP();
  
      // Extract necessary domains
      const { Page, Runtime } = client;
  
      // Enable necessary domains
      await Promise.all([Page.enable(), Runtime.enable()]);
  
      // Evaluate script to get current URL
      const result = await Runtime.evaluate({
        expression: "window.location.href",
      });
  
      await client.close();
      return result.result.value || "N/A"; // Return "N/A" if URL is not available
    } catch (err) {
      console.error("Error:", err);
      return "N/A"; // Return "N/A" if an error occurs
    }
  };
  module.exports = getUrl