import React from 'react';
import { CssBaseline, Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App1() {
  return (
    <Box sx={{ display: 'flex', height: '100vh', background: '#f5f6fa' }}>
      <CssBaseline />
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Dashboard />
      </Box>
    </Box>
  );
}

export default App1;
