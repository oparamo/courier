import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React, { useState } from 'react';

import { send } from '../../lib/ipc';
import MadeWithLove from '../made-with-love/MadeWithLove';
import styles from './styles';

const MainContent = function MainContent() {
  const classes = styles();

  const [result, setResult] = useState('');

  const factorial = async () => {
    const reply = await send('make-factorial', { num: 5 });
    setResult(reply);
  };

  const phoneCall = async () => {
    const reply = await send('ring-ring', { message: 'this is james' });
    setResult(reply);
  };

  const notReal = async () => {
    const reply = await send('fuuuu', { dog: 'i am a talking dog' });
    setResult(reply);
  };

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div className="butt">
              <h2>Hello</h2>

              <button id="factorial" onClick={factorial}>Compute factorial</button>
              <button id="call" onClick={phoneCall}>Make phone call</button>
              <button id="notReal" onClick={notReal}>Bad function</button>

              <div id="output">{result}</div>
            </div>
          </Paper>
        </Grid>
      </Container>
      <MadeWithLove />
    </main>
  );
};

export default MainContent;
