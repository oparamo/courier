import { Promise } from 'bluebird';
import { v4 } from 'uuid';

const deliveries = new Map();
const messages = [];
const serverHooks = new Map();
let client = null;
let isConnected = false;

const init = async () => {
  if (!window.getServerSocket) {
    return;
  }

  const socketName = await window.getServerSocket();
  client = await window.ipcConnect(socketName);

  client.on('connect', () => {
    isConnected = true;

    console.info('connected to socket');

    while (messages.length) {
      const message = messages.pop();
      client.emit('message', message);
    }
  });

  client.on('message', (data) => {
    const message = JSON.parse(data);

    if (message.type === 'reply') {
      const { id, result } = message;

      const delivery = deliveries.get(id);

      if (delivery) {
        deliveries.delete(id);
        delivery.resolve(result);
      } else {
        console.warn('unexpected reply message', message);
      }
    } else if (message.type === 'push') {
      const { name, args } = message;

      const hooks = serverHooks.get(name);

      if (hooks) {
        hooks.forEach((listener) => {
          listener(args);
        });
      } else {
        console.warn('unexpected push message', message);
      }
    } else if (message.type === 'error') {
      const { id } = message;

      const delivery = deliveries.get(id);

      if (delivery) {
        deliveries.delete(id);
        delivery.reject();
      } else {
        console.warn('unexpected error message', message);
      }
    } else {
      console.warn('unexpected message:', message);
    }
  });

  client.on('disconnect', () => {
    isConnected = false;
    client = null;
  });
};

const send = (name, args) => new Promise((resolve, reject) => {
  const id = v4();

  deliveries.set(id, { resolve, reject });

  const message = JSON.stringify({ id, name, args });

  if (isConnected) {
    client.emit('message', message);
  } else {
    console.info('pushing to local messages queue');

    messages.push(message);
  }
});

const listen = (name, listener) => {
  const hooks = serverHooks.get(name) || [];

  hooks.push(listener);
  serverHooks.set(name, hooks);

  const unlisten = () => {
    const filteredHooks = serverHooks.get(name).filter((hook) => hook !== listener);
    serverHooks.set(name, filteredHooks);
  };

  return unlisten;
};

const unlistenByName = (name) => {
  serverHooks.set(name, []);
};

export { init, send, listen, unlistenByName };
export default { init, send, listen, unlistenByName };
