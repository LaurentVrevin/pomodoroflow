// Import the timer and notifications scripts
importScripts('timer.js', 'notifications.js');

// Set initial values when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['workInterval', 'breakInterval', 'isTimerRunning'], data => {
    if (!data.workInterval || !data.breakInterval) {
      chrome.storage.local.set({ workInterval: 25, breakInterval: 5, workTime: 0, breakTime: 0, isTimerRunning: false }, () => {
        console.log("Initial values set: workInterval=25, breakInterval=5, workTime=0, breakTime=0, isTimerRunning=false");
      });
    }
    console.log("Extension installed and initial values set or existing values found.");
  });
});

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startTimer") {
    startCounter();
  } else if (request.action === "stopTimer") {
    stopCounter(true);
  } else if (request.action === "resetTimers") {
    resetTimers();
  } 
    
  sendResponse({ status: "ok" });
});


