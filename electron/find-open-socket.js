const ipc = require('node-ipc');

const isSocketTaken = (name) => new Promise((resolve) => {
  console.info('checking socket:', name);

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

const findOpenSocket = async () => {
  let currentSocket = 1;
  let openSocket = `courier${currentSocket}`;

  while (await isSocketTaken(openSocket)) {
    currentSocket++;
    openSocket = `courier${currentSocket}`;
  }

  console.info('found unoccupied socket: ', openSocket);

  return openSocket;
}

module.exports = findOpenSocket;
