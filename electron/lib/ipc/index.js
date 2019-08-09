const { get } = require('lodash');
const { Promise } = require('bluebird');
const ipc = require('node-ipc');

const ServiceBus = require('../asb');

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

const init = (socketName, handlers) => {
  ipc.config.id = socketName;
  ipc.config.silent = true;

  ipc.serve(() => {
    ipc.server.on('message', async (data, socket) => {
      const msg = JSON.parse(data);
      const { id, name, args } = msg;

      const defaultHandler = (name) => {
        console.warn('unknown method:', name);

        return Promise.resolve(null);
      }

      const handler = get(handlers, name, defaultHandler);

      let reply;

      try {
        const result = await handler(args);

        reply = JSON.stringify({ type: 'reply', id, result });
      } catch (e) {
        console.error('unexpected error:', e);

        reply = JSON.stringify({ type: 'error', id });
      }

      ipc.server.emit(socket, 'message', reply);
    });
  })

  ipc.server.start();
}

const send = (name, args) => {
  ipc.server.broadcast('message', JSON.stringify({ type: 'push', name, args }))
}

module.exports = { findOpenSocket, init, send }
