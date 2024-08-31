import React from 'react';
import { Box, Button, Card, CardContent, Typography, Grid, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const HomePage = () => {
const { user } = useAuth();
  
  return (
  <Box sx={{ color: 'white', padding: 4, textAlign: 'center', backgroundImage: `url('/assets/images/landing-background.jpg')` }}>
    {/* Hero Section */}
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="h3" gutterBottom>
        Supercharge Your Sales with AI
      </Typography>
      <Typography variant="h6" gutterBottom>
        Let our AI-powered sales assistant handle the heavy lifting, so you can focus on closing deals.
      </Typography>

      {user ? (
        <Button component={Link} to={`${user.displayName}/upgrade`} variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Go Pro
        </Button>
      )
      : (
        <Button component={Link} to="register" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Get Started
        </Button>
      )}
    </Box>

    {/* Feature Cards */}
    <Grid container spacing={4}>

      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Instant Bot Creation
            </Typography>
            <CardMedia 
              component="img"
              image="/assets/images/bot-creation.jpg"
              />
            <Typography>
              Sign up and get your dedicated AI sales bot ready to work for you in seconds. 
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Effortless Lead Generation
            </Typography>
             <CardMedia 
              component="img"
              image="/assets/images/lead-generation.jpg"
              />
            <Typography>
              Your bot scours the web to find and qualify high-potential leads, saving you valuable time.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              AI-Powered Outreach
            </Typography>
             <CardMedia 
              component="img"
              image="/assets/images/ai-outreach.jpg"
              />
            <Typography>
              Engage leads with personalized emails, texts, or even calls, all crafted by your AI assistant. 
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        {/* <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Detailed Interaction History
            </Typography>
             <CardMedia 
              component="img"
              image="/assets/images/bot-creation.jpg"
              />
            <Typography>
              Review every interaction your bot has with leads, gaining valuable insights and tracking progress. 
            </Typography>
          </CardContent>
        </Card> */}
      </Grid>
    </Grid>
  </Box>
);
}

export default HomePage;