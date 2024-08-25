import { Box, Container } from '@mui/material';
import React from 'react';
import CallsMadeList from './CallsMadeList';
import LeadsList from './LeadsList';

const CallView = () => {
  return (
    <div>
      <h2>Call View</h2>
      <p>Call details will be displayed here</p>
    </div>
  );
}

const CallLogServicePage = () => {
  return (
    <Container>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        padding: 4,
        width: '100%'
      }}>
        <LeadsList />
        <CallsMadeList />
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <CallView />
      </Box>
    </Container>
  );
};

export default CallLogServicePage;
