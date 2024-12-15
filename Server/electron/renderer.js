const { ipcRenderer } = require('electron');

const startButton = document.getElementById('start-server');
const stopButton = document.getElementById('stop-server');
const logArea = document.getElementById('log-area');

startButton.addEventListener('click', () => {
  ipcRenderer.send('start-server');
});

stopButton.addEventListener('click', () => {
  ipcRenderer.send('stop-server');
});

ipcRenderer.on('log', (event, message) => {
  const logEntry = document.createElement('div');
  logEntry.textContent = message;
  logArea.appendChild(logEntry);
});
