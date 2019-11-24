import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

import styles from './styles';

import { send } from '../../lib/ipc';

const AddNamespace = function AddNamespace() {
  const classes = styles();

  const [connectionString, setConnectionString] = useState('');

  const addConnectionString = async () => {
    await send('add-namespace', { connectionString });

    console.info('added namespace, ready man');
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="filled-full-width"
        label="Namespace Connection String"
        placeholder="Endpoint=sb://****.servicebus.windows.net/;SharedAccessKeyName=****;SharedAccessKey=****"
        autoFocus
        fullWidth
        margin="normal"
        variant="outlined"
        onChange={(event) => setConnectionString(event.target.value)}
      />
      <button id="addNamespaceButton" onClick={addConnectionString}>Add Namespace</button>
    </form>
  );
};

export default AddNamespace;
