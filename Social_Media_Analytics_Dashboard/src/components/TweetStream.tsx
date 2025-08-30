import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Avatar } from '@mui/material';

// Mock tweets
const mockTweets = [
  { user: 'Alice', text: 'Loving the new dashboard! 🚀', avatar: '/avatar1.png' },
  { user: 'Bob', text: 'Sentiment analysis is so cool!', avatar: '/avatar2.png' },
  { user: 'Carol', text: 'Real-time updates are impressive.', avatar: '/avatar3.png' },
  { user: 'Dave', text: 'Great work team!', avatar: '/avatar4.png' },
];

function getRandomTweet() {
  const idx = Math.floor(Math.random() * mockTweets.length);
  return { ...mockTweets[idx], time: new Date().toLocaleTimeString().slice(0, 8) };
}

export default function TweetStream() {
  const [tweets, setTweets] = useState<Array<any>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTweets(prev => [getRandomTweet(), ...prev.slice(0, 19)]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ height: 200, overflowY: 'auto', background: '#fff', borderRadius: 2, p: 2 }}>
      <List>
        {tweets.length === 0 && (
          <Typography variant="body2" color="textSecondary">
            Loading tweets...
          </Typography>
        )}
        {tweets.map((tweet, idx) => (
          <ListItem key={idx} alignItems="flex-start">
            <Avatar src={tweet.avatar} sx={{ mr: 2 }} />
            <ListItemText
              primary={
                <Typography variant="subtitle2" color="primary">
                  {tweet.user} <span style={{ color: '#888', fontSize: '0.8em' }}>{tweet.time}</span>
                </Typography>
              }
              secondary={tweet.text}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
