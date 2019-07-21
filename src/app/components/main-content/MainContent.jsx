import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';

import MadeWithLove from '../made-with-love/MadeWithLove';
import styles from './styles';

const MainContent = () => {
  const classes = styles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
      <MadeWithLove />
    </main>
  );
}

export default MainContent;
