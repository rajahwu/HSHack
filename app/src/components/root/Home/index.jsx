import React from 'react';
import { Box, Button, Card, CardContent, Typography, Grid } from '@mui/material';

const HomePage = () => (
  <Box sx={{ padding: 4, textAlign: 'center' }}>
    {/* Hero Section */}
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Our App
      </Typography>
      <Typography variant="h6" gutterBottom>
        Your ultimate solution for sales management and customer engagement.
      </Typography>
      <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
        Get Started
      </Button>
    </Box>

    {/* Feature Cards */}
    <Grid container spacing={4}>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Feature 1
            </Typography>
            <Typography>
              Brief description of what this feature offers and how it benefits the user.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Feature 2
            </Typography>
            <Typography>
              Brief description of what this feature offers and how it benefits the user.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Feature 3
            </Typography>
            <Typography>
              Brief description of what this feature offers and how it benefits the user.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

export default HomePage;
