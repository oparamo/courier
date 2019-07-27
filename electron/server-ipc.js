const { get } = require('lodash');
const { Promise } = require('bluebird');
const ipc = require('node-ipc');

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

module.exports = { init, send }
