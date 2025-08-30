import React from 'react';
import { Box, Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const drawerWidth = 240;

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff'
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Social Analytics
        </Typography>
      </Box>
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemIcon sx={{ color: '#fff' }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon sx={{ color: '#fff' }}>
              <TrendingUpIcon />
            </ListItemIcon>
            <ListItemText primary="Trends" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
