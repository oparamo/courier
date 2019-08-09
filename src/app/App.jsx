import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';

import { init } from './lib/ipc';
import Bar from './components/bar/Bar';
import Explorer from './components/explorer/Explorer';
import MainContent from './components/main-content/MainContent';

init();

const useStyles = makeStyles({
  root: { display: 'flex' }
});

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Bar />
      <Explorer />
      <MainContent />
    </div>
  );
};

export default App;
