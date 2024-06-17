import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  const username = sessionStorage.getItem('username');
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Welcome, {username}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
