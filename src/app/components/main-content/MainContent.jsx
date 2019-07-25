import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React, { useState } from 'react';

import MadeWithLove from '../made-with-love/MadeWithLove';
import styles from './styles';

import ipcClient from './client-ipc';

ipcClient.init();

const MainContent = function MainContent() {
  const classes = styles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


  const [result, setResult] = useState('');

  const factorial = async () => {
    let reply = await ipcClient.send('make-factorial', { num: 5 })
    setResult(reply)
  };

  const phoneCall = async () => {
    let reply = await ipcClient.send('ring-ring', { message: 'this is james' })
    setResult(reply)
  };

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <div className="butt">
        <h2>Hello</h2>

        <button id="factorial" onClick={factorial}>Compute factorial</button>
        <button id="call" onClick={phoneCall}>Make phone call</button>

        <div id="output">{result}</div>
      </div>
      <MadeWithLove />
    </main>
  );
}

export default MainContent;
