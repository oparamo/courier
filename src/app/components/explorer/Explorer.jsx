import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import React, { useState } from 'react';

import { send } from '../../lib/ipc';
import styles from './styles';

const Explorer = function Explorer() {
  const classes = styles();

  const [open, setOpen] = useState(true);

  const handleDrawerClose = () => {
    // setOpen(false);
  };

  const [topics, setTopics] = useState([]);

  const getTopics = async () => {
    const topicList = await send('get-topics', { namespace: 'fatline-sandbox' });

    console.log(topicList);

    setTopics(topicList);
  };

  return (
    <div>
      <Drawer
        variant="persistent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.toolbarIcon}>
          <IconButton onClick={getTopics}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
      </Drawer>
    </div>
  );
};

export default Explorer;
