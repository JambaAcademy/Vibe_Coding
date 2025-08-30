import React from 'react';
import { Paper, Box, Typography, Stack } from '@mui/material';

export default function UserStats() {
  // TODO: Replace with real stats from backend
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        User Stats
      </Typography>
      <Stack spacing={2}>
        <Box>
          <Typography variant="subtitle2">Active Users</Typography>
          <Typography variant="h5" color="primary">500</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">Tweets Processed (hr)</Typography>
          <Typography variant="h5" color="secondary">100,000+</Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
