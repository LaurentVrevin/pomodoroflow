let isWorkInterval = true;
let counterInterval;

function startCounter() {
  if (counterInterval) {
    clearInterval(counterInterval);
  }
  counterInterval = setInterval(updateTimes, 1000);
}

function stopCounter(reset = false) {
  if (counterInterval) {
    clearInterval(counterInterval);
    counterInterval = null;
  }
  if (reset) {
    isWorkInterval = true;
    chrome.storage.local.set({ workTime: 0, breakTime: 0 });
  }
}

function resetTimers() {
  chrome.storage.local.set({ workTime: 0, breakTime: 0 }, () => {
    console.log('Timers reset');
  });
  stopCounter(true);
}

function updateTimes() {
  chrome.storage.local.get(['workTime', 'breakTime', 'workInterval', 'breakInterval'], data => {
    if (isWorkInterval) {
      let newWorkTime = data.workTime + 1;
      chrome.storage.local.set({ workTime: newWorkTime }, () => {
        if (newWorkTime >= data.workInterval * 60) {
          stopCounter();
          showNotification("Time to take a break!", "Please confirm your break.");
        }
        notifyPopup(newWorkTime);
      });
    } else {
      let newBreakTime = data.breakTime + 1;
      chrome.storage.local.set({ breakTime: newBreakTime }, () => {
        if (newBreakTime >= data.breakInterval * 60) {
          stopCounter();
          showNotification("Break over!", "Please confirm to start working.");
        }
        notifyPopup(newBreakTime);
      });
    }
  });
}

function notifyPopup(time) {
  chrome.runtime.sendMessage({ action: "updateTime", time: time, isWorkInterval: isWorkInterval }, response => {
    if (chrome.runtime.lastError) {
      console.log("Popup is not open.");
    } else {
      console.log("Popup updated.");
    }
  });
}
