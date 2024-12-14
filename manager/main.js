const { app, BrowserWindow, globalShortcut } = require("electron");
const cookelog = require("./cookelog");
const db = require("../db/database");
let mainWindow;
let serverStarted = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("index.html").then(() => {
    cookelog("Portal is ready.");
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

async function startServer() {
  if (serverStarted) {
    cookelog("Server is already running.");
    return;
  }

  cookelog("Starting server...");

  try {
    await db.connect();
    cookelog("DB is ready.");

    try {
      const discordAuthConfig = require("../auth/auth.json");
      if (discordAuthConfig.clientID && discordAuthConfig.clientSecret) {
        cookelog("Discord auth is ON.");
      } else {
        cookelog("Discord auth is OFF.");
      }
    } catch (err) {
      cookelog("Discord auth is OFF.");
    }

    cookelog("In game is ready.");
    cookelog("Server is ON.");
    serverStarted = true;
  } catch (error) {
    cookelog("ERROR!", true);
    cookelog("SQLite3 connection Failed.", true);
    app.quit();
  }
}

function stopServer() {
  if (!serverStarted) {
    cookelog("Server is not running.");
    return;
  }

  cookelog("Stopping server...");
  serverStarted = false;
  cookelog("Server stopped.");
}

app.whenReady().then(() => {
  createWindow();

  globalShortcut.register("Control+O", () => {
    startServer();
  });

  globalShortcut.register("Control+P", () => {
    stopServer();
  });

  setInterval(() => {
    const isWorkerAlive = Math.random() > 0.9;
    if (!isWorkerAlive) {
      cookelog("ERROR!", true);
      cookelog(`Worker ${Math.floor(Math.random() * 10000)} is died.`, true);
      stopServer();
    }
  }, 5000);
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
