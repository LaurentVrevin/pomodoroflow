document.addEventListener('DOMContentLoaded', function() {
  loadSettings();
  document.getElementById('startStopButton').addEventListener('click', toggleTimer);

  // Initial call to update times on load
  updateElapsedTimeDisplay(0);

  // Listen for updates from the background script
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "updateTime") {
      updateElapsedTimeDisplay(request.time, request.isWorkInterval);
    }
  });

  // Initialize button state based on stored timer status
  chrome.storage.local.get(['isTimerRunning'], function(data) {
    updateButtonState(data.isTimerRunning);
  });
});

function loadSettings() {
  chrome.storage.local.get(['workInterval', 'breakInterval'], function(data) {
    document.getElementById('workInterval').value = data.workInterval || 25;
    document.getElementById('breakInterval').value = data.breakInterval || 5;
    updateElapsedTimeDisplay(0); // Initialize to 0
    console.log('Settings loaded', data);
  });
}

function saveSettings() {
  let workInterval = document.getElementById('workInterval').value;
  let breakInterval = document.getElementById('breakInterval').value;
  chrome.storage.local.set({
    workInterval: parseInt(workInterval),
    breakInterval: parseInt(breakInterval),
    workTime: 0,
    breakTime: 0
  }, function() {
    console.log('Settings saved', { workInterval, breakInterval });
  });
}

function toggleTimer() {
  chrome.storage.local.get(['isTimerRunning'], function(data) {
    if (data.isTimerRunning) {
      stopCounter();
    } else {
      saveSettings();
      startCounter();
    }
  });
}

function startCounter() {
  chrome.storage.local.set({ isTimerRunning: true }, function() {
    chrome.runtime.sendMessage({ action: "startTimer" }, function(response) {
      console.log('Timer started', response);
      updateButtonState(true);
    });
  });
}

function stopCounter() {
  chrome.storage.local.set({ isTimerRunning: false, workTime: 0, breakTime: 0 }, function() {
    chrome.runtime.sendMessage({ action: "stopTimer" }, function(response) {
      console.log('Timer stopped', response);
      updateButtonState(false);
      updateElapsedTimeDisplay(0);
    });
  });
}

function updateButtonState(isRunning) {
  const button = document.getElementById('startStopButton');
  button.textContent = isRunning ? 'Stop Timer' : 'Start Timer';
}

function updateElapsedTimeDisplay(timeInSeconds, isWorkInterval) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  const elapsedTimeElement = document.getElementById('elapsedTime');
  elapsedTimeElement.innerText = formattedTime;
  elapsedTimeElement.className = `counter ${isWorkInterval ? 'work' : 'break'}`;
}
