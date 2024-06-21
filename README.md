# P O M O D O R O F L O W

![Language](https://img.shields.io/badge/language-JavaScript-yellow.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Chrome](https://img.shields.io/badge/chrome-extension-green.svg)

## Description

**P O M O D O R O F L O W** is a Chrome extension designed to help users stay focused and take regular breaks using the Pomodoro technique. The extension allows users to set custom work and break intervals and sends notifications to remind the user to take breaks and get back to work.

## Features

- Set custom work and break intervals.
- Display elapsed time in a simple user interface.
- Send notifications to indicate when to start a break or get back to work.
- Ability to start, stop the timer.

## Installation

1. Clone the repository or download the source files.
    ```sh
    git clone https://github.com/your-username/pomodoro-flow-extension.git
    ```
2. Open Google Chrome and go to `chrome://extensions/`.
3. Enable Developer mode in the top right corner.
4. Click "Load unpacked".
5. Select the project folder `pomodoroflow`.

## Usage

1. Click on the extension icon in the Chrome toolbar to open the popup.
2. Set the work and break intervals in minutes.
3. Click "Start Timer" to begin the timer.
4. Use the "Stop Timer" button to stop the timer and reset the elapsed time.
5. Use the "Reset Timer" button to reset the timers.

## Project Structure


   ```sh
pomodoroflow/
│
├── icons/
│ ├── icon16.png
│ ├── icon48.png
│ └── icon128.png
│
├── scripts/
│ ├── background.js
│ ├── popup.js
│ ├── timer.js
│ └── notifications.js
│
├── styles/
│ └── styles.css
│
├── popup.html
└── manifest.json
  ```


### Key Files

- **`manifest.json`**: Chrome extension configuration file.
- **`popup.html`**: Popup user interface.
- **`styles/styles.css`**: CSS styles for the popup.
- **`scripts/background.js`**: Background script managing the timer and notifications.
- **`scripts/popup.js`**: Script managing user interactions in the popup.
- **`scripts/timer.js`**: Timer management logic.
- **`scripts/notifications.js`**: Notification management logic.

## Screenshots

### Popup :
![screenshotpomodorow](https://github.com/LaurentVrevin/pomodoroflow/assets/94620399/bd85c3b9-6ecf-4c93-aea2-71821b7f9c7c)


### Notification :
![screenshotNotification](https://github.com/LaurentVrevin/pomodoroflow/assets/94620399/dd9c4f5a-eac7-4733-b393-39abdb4cfcb8)


## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## Author

- **Laurent Vrévin** - [My Profile](https://github.com/LaurentVrevin)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
