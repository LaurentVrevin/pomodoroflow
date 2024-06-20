function showNotification(title, message) {
    chrome.notifications.create('', {
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: title,
      message: message,
      priority: 2,
      buttons: [{ title: 'Confirm' }]
    });
  }
  
  chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
    if (buttonIndex === 0) {
      chrome.notifications.clear(notificationId);
      isWorkInterval = !isWorkInterval;
      startCounter();
    }
  });
  