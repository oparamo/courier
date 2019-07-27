const { app, BrowserWindow } = require('electron');
const { fork } = require('child_process');
const isDev = require('electron-is-dev');
const path = require('path');

const findOpenSocket = require('../electron/find-open-socket');

let clientWin;
let serverWin;
let serverProcess;

const createWindow = (socketName) => {
  clientWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/../electron/client-preload.js'
    }
  })

  const url = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
  clientWin.loadURL(url);

  clientWin.webContents.on('did-finish-load', () => {
    clientWin.webContents.send('set-socket', { name: socketName });
  });
}

const createBackgroundWindow = (socketName) => {
  serverWin = new BrowserWindow({
    x: 500,
    y: 300,
    width: 700,
    height: 500,
    show: true,
    webPreferences: { nodeIntegration: true }
  });

  const url = `file://${path.join(__dirname, '../electron/server-dev.html')}`;
  serverWin.loadURL(url);

  serverWin.webContents.on('did-finish-load', () => {
    serverWin.webContents.send('set-socket', { name: socketName });
  });

  serverWin.webContents.openDevTools();
}

const createBackgroundProcess = (socketName) => {
  serverProcess = fork(__dirname + '/../electron/server.js', [
    '--subprocess',
    app.getVersion(),
    socketName
  ]);

  serverProcess.on('message', (msg) => {
    console.log(msg);
  });
}

app.on('ready', async () => {
  const serverSocket = await findOpenSocket();

  createWindow(serverSocket);

  if (isDev) {
    createBackgroundWindow(serverSocket);
  } else {
    createBackgroundProcess(serverSocket);
  }
});

app.on('before-quit', () => {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (clientWin === null) {
    createWindow();
  }
});
