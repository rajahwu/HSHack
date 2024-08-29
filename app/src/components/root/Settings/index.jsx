import React from 'react';
import { Box, Card, CardContent, Typography, FormControl, FormControlLabel, Switch, Button, Stack } from '@mui/material';

const SettingsPage = () => (
  <Box sx={{ padding: 4 }}>
    <Card sx={{ padding: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Settings
        </Typography>

        {/* Notification Settings */}
        <FormControl component="fieldset">
          <Typography variant="h6">Notifications</Typography>
          <FormControlLabel control={<Switch defaultChecked />} label="Email Notifications" />
          <FormControlLabel control={<Switch />} label="Push Notifications" />
        </FormControl>

        {/* Theme Settings */}
        <FormControl component="fieldset" sx={{ marginTop: 4 }}>
          <Typography variant="h6">Appearance</Typography>
          <FormControlLabel control={<Switch defaultChecked />} label="Dark Mode" />
        </FormControl>

        {/* Save Settings */}
        <Stack direction="row" justifyContent="center" sx={{ marginTop: 4 }}>
          <Button variant="contained" color="primary">
            Save Settings
          </Button>
        </Stack>
      </CardContent>
    </Card>
  </Box>
);

export default SettingsPage;
