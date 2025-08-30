import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

// Mock real-time sentiment data
const generateData = () => {
  const now = new Date();
  return {
    time: now.toLocaleTimeString().slice(0, 8),
    positive: Math.floor(Math.random() * 60) + 20,
    neutral: Math.floor(Math.random() * 30) + 10,
    negative: Math.floor(Math.random() * 20),
  };
};

export default function SentimentChart() {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => [...prev.slice(-19), generateData()]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ height: 240 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="positive" stroke="#43ea7f" dot={false} />
          <Line type="monotone" dataKey="neutral" stroke="#ffd700" dot={false} />
          <Line type="monotone" dataKey="negative" stroke="#ff4d4f" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      {data.length === 0 && (
        <Typography variant="body1" color="textSecondary" align="center">
          Loading sentiment data...
        </Typography>
      )}
    </Box>
  );
}
