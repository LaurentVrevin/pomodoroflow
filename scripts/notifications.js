// Show a notification with a title and message
function showNotification(title, message) {
  const iconUrl = chrome.runtime.getURL('icons/icon128.png');
  console.log(`Notification icon URL: ${iconUrl}`);

  chrome.notifications.create('', {
    type: 'basic',
    iconUrl: iconUrl,
    title: title,
    message: message,
    priority: 2,
    buttons: [{ title: 'Confirm' }]
  }, function(notificationId) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else {
      console.log('Notification displayed with ID:', notificationId);
      chrome.runtime.sendMessage({ action: "playSound" });
    }
  });
}

// Handle button clicks on the notifications
chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  if (buttonIndex === 0) {
    chrome.notifications.clear(notificationId);
    isWorkInterval = !isWorkInterval;
    chrome.storage.local.set({ workTime: 0, breakTime: 0 }, () => {
      startCounter();
    });
  }
});

