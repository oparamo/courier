const { app, BrowserWindow } = require('electron');
const { fork } = require('child_process');
const { join } = require('path');
const isDev = require('electron-is-dev');

const findOpenSocket = require('../electron/find-open-socket');

let clientWindow;
let serverWindow;
let serverProcess;

const createWindow = (socketName) => {
  clientWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { preload: join(__dirname, '../electron/client-preload.js') }
  });

  const setSocket = () => { clientWindow.webContents.send('set-socket', { socketName }); };
  clientWindow.webContents.on('did-finish-load', setSocket);

  const url = isDev ? 'http://localhost:3000' : `file://${join(__dirname, '../build/index.html')}`;
  clientWindow.loadURL(url);
}

const createBackgroundWindow = (socketName) => {
  serverWindow = new BrowserWindow({
    x: 500,
    y: 300,
    width: 700,
    height: 500,
    show: true,
    webPreferences: { nodeIntegration: true }
  });

  const setSocket = () => { serverWindow.webContents.send('set-socket', { socketName }); };
  serverWindow.webContents.on('did-finish-load', setSocket);

  serverWindow.webContents.openDevTools();

  const url = `file://${join(__dirname, '../electron/server-dev.html')}`;
  serverWindow.loadURL(url);
}

const createBackgroundProcess = (socketName) => {
  serverProcess = fork(join(__dirname, '../electron/server.js'), [
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
  if (clientWindow === null) {
    createWindow();
  }
});
