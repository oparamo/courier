const { assign } = require('lodash');

const asbHandlers = require('./asb');

const handlers = {};

handlers['make-factorial'] = async ({ num }) => {
  const fact = (n) => {
    if (n === 1) {
      return 1;
    }
    return n * fact(n - 1);
  };

  console.info('making factorial');

  return fact(num);
};

handlers['ring-ring'] = async () => {
  console.info('picking up the phone');

  return 'hello!';
};

module.exports = assign(handlers, asbHandlers);
