const handlers = {};

handlers._history = [];

handlers['make-factorial'] = async ({ num }) => {
  handlers._history.push(num);

  const fact = (n) => {
    if (n === 1) {
      return 1;
    }
    return n * fact(n - 1);
  };

  console.info('making factorial');

  return fact(num);
}

handlers['ring-ring'] = async () => {
  console.info('picking up the phone');

  return 'hello!';
}

module.exports = handlers;
