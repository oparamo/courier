import React from 'react';
import ReactDOM from 'react-dom';

import Explorer from './Explorer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Explorer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
