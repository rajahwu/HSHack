// src/components/services/LeadContactLog/CallLogLanding.jsx

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CallLogLanding = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Call Log
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 2 }}>
        Here you can manage all your leads and view your call history.
        Select an option from the sidebar to get started.
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Button 
          component={Link} 
          to="leads" 
          variant="contained" 
          color="primary" 
          sx={{ mr: 2 }}
        >
          View Leads
        </Button>
        <Button 
          component={Link} 
          to="history" 
          variant="outlined" 
          color="primary"
        >
          View Call History
        </Button>
      </Box>
    </Box>
  );
};

export default CallLogLanding;
