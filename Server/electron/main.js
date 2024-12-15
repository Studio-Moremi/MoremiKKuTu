const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');

let mainWindow;
let serverProcess = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js'),
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (serverProcess) serverProcess.kill();
  });
});

ipcMain.on('start-server', (event) => {
  if (serverProcess) {
    event.reply('log', '서버가 이미 실행 중입니다.');
    return;
  }

  event.reply('log', '서버 시작 중...');
  serverProcess = exec('node Web/main.js', { cwd: path.join(__dirname, '../') });

  serverProcess.stdout.on('data', (data) => {
    event.reply('log', data.toString());
  });

  serverProcess.stderr.on('data', (data) => {
    event.reply('log', `오류 발생: ${data}`);
    serverProcess.kill();
    serverProcess = null;
    event.reply('log', '서버가 종료되었습니다.');
  });

  serverProcess.on('exit', (code) => {
    event.reply('log', `서버가 종료되었습니다. 종료 코드: ${code}`);
    serverProcess = null;
  });
});

ipcMain.on('stop-server', (event) => {
  if (!serverProcess) {
    event.reply('log', '서버가 실행 중이지 않습니다.');
    return;
  }

  serverProcess.kill();
  serverProcess = null;
  event.reply('log', '서버가 종료되었습니다.');
});
