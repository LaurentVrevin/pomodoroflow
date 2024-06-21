// Track if it is work interval or break interval
let isWorkInterval = true;
// Store the interval ID for clearing it later
let counterInterval;

// Start the timer
function startCounter() {
  console.log("Starting counter...");
  if (counterInterval) {
    clearInterval(counterInterval);
  }
  counterInterval = setInterval(updateTimes, 1000);
}

// Stop the timer and reset if necessary
function stopCounter(reset = false) {
  console.log("Stopping counter...");
  if (counterInterval) {
    clearInterval(counterInterval);
    counterInterval = null;
  }
  if (reset) {
    isWorkInterval = true;
    chrome.storage.local.set({ workTime: 0, breakTime: 0 });
  }
}

// Reset the timers
function resetTimers() {
  console.log("Resetting timers...");
  chrome.storage.local.set({ workTime: 0, breakTime: 0 }, () => {
    console.log('Timers reset');
  });
  stopCounter(true);
}

// Update the timers every second
function updateTimes() {
  chrome.storage.local.get(['workTime', 'breakTime', 'workInterval', 'breakInterval'], data => {
    console.log("Updating times...");
    if (isWorkInterval) {
      let newWorkTime = data.workTime + 1;
      chrome.storage.local.set({ workTime: newWorkTime }, () => {
        console.log(`New work time: ${newWorkTime}`);
        if (newWorkTime >= data.workInterval * 60) {
          stopCounter();
          console.log("Work interval complete, showing break notification...");
          showNotification("Time to take a break!", "Please confirm your break.");
        }
        notifyPopup(newWorkTime);
      });
    } else {
      let newBreakTime = data.breakTime + 1;
      chrome.storage.local.set({ breakTime: newBreakTime }, () => {
        console.log(`New break time: ${newBreakTime}`);
        if (newBreakTime >= data.breakInterval * 60) {
          stopCounter();
          console.log("Break interval complete, showing work notification...");
          showNotification("Break over!", "Please confirm to start working.");
        }
        notifyPopup(newBreakTime);
      });
    }
  });
}

// Send the updated time to the popup
function notifyPopup(time) {
  chrome.runtime.sendMessage({ action: "updateTime", time: time, isWorkInterval: isWorkInterval }, response => {
    if (chrome.runtime.lastError) {
      console.log("Popup is not open.");
    } else {
      console.log("Popup updated.");
    }
  });
}
