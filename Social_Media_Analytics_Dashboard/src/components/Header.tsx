import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Header() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div">
          Social Media Analytics Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
