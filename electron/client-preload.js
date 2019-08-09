const { ipcRenderer } = require('electron');
const ipc = require('node-ipc');
const isDev = require('electron-is-dev');

const socket = new Promise((resolve) => {
  ipcRenderer.on('set-socket', (event, { socketName }) => {
    resolve(socketName);
  });
});

window.getServerSocket = () => socket;

window.ipcConnect = (id) => new Promise((resolve) => {
  ipc.config.silent = true;
  ipc.connectTo(id, () => {
    const client = ipc.of[id];
    resolve(client);
  });
});

window.IS_DEV = isDev;
