import React from 'react';
import { Box, Button, Card, CardContent, Avatar, Typography, TextField, Stack } from '@mui/material';
import { useAuth } from '../../../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();
  return (
  <Box sx={{ padding: 4 }}>
    <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4 }}>
      {/* User Avatar */}
      <Avatar
        src={user?.photoURL || 'https://picsum.photos/100'}
        alt={user?.displayName || 'User Avatar'}
        sx={{ width: 100, height: 100, marginBottom: 2 }}
      />
      <Typography variant="h5">{user?.displayName || 'User Name'}</Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        {user?.email || 'user@example.com'}
      </Typography>

      {/* Edit Profile Form */}
      <Stack spacing={2} sx={{ width: '100%', marginTop: 2 }}>
        <TextField label="Full Name" defaultValue={user?.displayName} fullWidth />
        <TextField label="Email" defaultValue={user?.email} fullWidth />
        <Button variant="contained" color="primary">
          Save Changes
        </Button>
      </Stack>
    </Card>
  </Box>
)};

export default ProfilePage;
