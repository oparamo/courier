const { app, BrowserWindow } = require('electron');
const { fork } = require('child_process');
const electron = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url')
const net = require('net');
const os = require('os');
const { join } = require('path');
const ipc = require('node-ipc');

function isSocketTaken(name, fn) {
  return new Promise((resolve, reject) => {
    ipc.connectTo(name, () => {
      ipc.of[name].on('error', () => {
        ipc.disconnect(name);
        resolve(false);
      });

      ipc.of[name].on('connect', () => {
        ipc.disconnect(name);
        resolve(true);
      });
    });
  });
}

async function findOpenSocket() {
  let currentSocket = 1;
  console.log('checking', currentSocket);
  while (await isSocketTaken('myapp' + currentSocket)) {
    currentSocket++;
    console.log('checking', currentSocket);
  }
  console.log('found socket', currentSocket);
  return 'myapp' + currentSocket;
}

// const findOpenSocket = require('../electron/find-open-socket');

let clientWin
let serverWin
let serverProcess

function createWindow(socketName) {
  clientWin = new BrowserWindow({
    width: 800,
    height: 600,
    // webPreferences: {
    //   nodeIntegration: true,
    //   preload: __dirname + '/../electron/client-preload.js'
    // }
  })

  // console.log(path.join(__dirname, '../build/index.html'))
  // console.log(`file://${path.join(__dirname, '../build/index.html')}`)
  let startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  // } catch(e) {
  //   console.log(e)
  // }
  // const

  console.log(startUrl)

  clientWin.loadURL(startUrl);

  clientWin.webContents.on('did-finish-load', () => {
    clientWin.webContents.send('set-socket', { name: socketName });
  });
}

function createBackgroundWindow(socketName) {
  const win = new BrowserWindow({
    x: 500,
    y: 300,
    width: 700,
    height: 500,
    show: true,
    webPreferences: { nodeIntegration: true }
  });

  win.loadURL(`file://${__dirname}/../electron/server-dev.html`);

  win.webContents.on('did-finish-load', () => {
    win.webContents.send('set-socket', { name: socketName });
  });

  serverWin = win;
}

function createBackgroundProcess(socketName) {
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
  if (mainWindow === null) {
    createWindow();
  }
});
