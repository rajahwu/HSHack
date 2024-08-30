import React from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Stack, Paper } from '@mui/material';

const ChatPage = () => (
  <Box sx={{ padding: 4 }}>
    <Card sx={{ height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardContent>
        {/* Chat Header */}
        <Typography variant="h5" gutterBottom>
          Chat
        </Typography>
        {/* Chat Messages */}
        <Paper sx={{ height: '60vh', overflowY: 'auto', padding: 2, marginBottom: 2 }}>
          <Stack spacing={2}>
            <Typography variant="body1"><strong>User 1:</strong> Hello, how can I help you today?</Typography>
            <Typography variant="body1"><strong>User 2:</strong> I have a question about my account.</Typography>
          </Stack>
        </Paper>
      </CardContent>

      {/* Message Input */}
      <Box sx={{ padding: 2 }}>
        <Stack direction="row" spacing={2}>
          <TextField fullWidth label="Type a message..." variant="outlined" />
          <Button variant="contained" color="primary">Send</Button>
        </Stack>
      </Box>
    </Card>
  </Box>
);

export default ChatPage;
