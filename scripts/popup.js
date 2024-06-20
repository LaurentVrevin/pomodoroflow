document.addEventListener('DOMContentLoaded', function() {
  loadSettings();
  document.getElementById('startButton').addEventListener('click', function() {
    saveSettings();
    startCounter();
  });
  document.getElementById('resetButton').addEventListener('click', resetTimers);
  document.getElementById('stopButton').addEventListener('click', stopCounter);

  // Initial call to update times on load
  updateElapsedTimeDisplay(0); // Initialize to 0

  // Listen for updates from the background script
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "updateTime") {
      updateElapsedTimeDisplay(request.time, request.isWorkInterval);
    }
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

function resetTimers() {
  chrome.runtime.sendMessage({ action: "resetTimers" }, function(response) {
    console.log('Timers reset', response);
    updateElapsedTimeDisplay(0);
  });
}

function startCounter() {
  chrome.runtime.sendMessage({ action: "startTimer" }, function(response) {
    console.log('Timer started', response);
  });
}

function stopCounter() {
  chrome.runtime.sendMessage({ action: "stopTimer" }, function(response) {
    console.log('Timer stopped', response);
    updateElapsedTimeDisplay(0);
  });
}

function updateElapsedTimeDisplay(timeInSeconds, isWorkInterval) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  const elapsedTimeElement = document.getElementById('elapsedTime');
  elapsedTimeElement.innerText = formattedTime;
  elapsedTimeElement.className = `counter ${isWorkInterval ? 'work' : 'break'}`;
}
