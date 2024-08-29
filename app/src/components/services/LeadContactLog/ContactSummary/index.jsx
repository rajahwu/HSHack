import React from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import { Container, Typography, Paper, Box, List, ListItem, ListItemText, Divider } from '@mui/material';

const ContactSummary = () => {
  const { contactId } = useParams();
  const { salesContact, correspondence } = useLoaderData();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Sales Contact Summary
        </Typography>

        {salesContact && (
          <>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5">Contact Details</Typography>
              <Typography><strong>Date:</strong> {salesContact.date ? new Date(salesContact.date.seconds * 1000).toLocaleString() : 'N/A'}</Typography>
              <Typography><strong>Type:</strong> {salesContact.type || 'N/A'}</Typography>
              <Typography><strong>Duration:</strong> {salesContact.duration || 'N/A'} seconds</Typography>
              <Typography><strong>Status:</strong> {salesContact.status || 'N/A'}</Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="h5">Participants</Typography>
              <Typography><strong>Caller:</strong> {salesContact.participants?.caller || 'N/A'}</Typography>
              <Typography><strong>Customer:</strong> {salesContact.participants?.customer || 'N/A'}</Typography>
            </Box>
          </>
        )}

        {correspondence && correspondence.content && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5">Correspondence Details</Typography>
              <Typography><strong>Score:</strong> {correspondence.content.score || 'N/A'}</Typography>
              <Typography><strong>Outcome:</strong> {correspondence.content.outcome || 'N/A'}</Typography>
            </Box>

            <Box>
              <Typography variant="h6">Conversation</Typography>
              <List>
                {correspondence.content.script?.caller?.map((line, index) => (
                  <ListItem key={`caller-${index}`}>
                    <ListItemText primary={`Caller: ${line}`} />
                  </ListItem>
                )) || 'No caller lines available'}
                {correspondence.content.script?.customer?.map((line, index) => (
                  <ListItem key={`customer-${index}`}>
                    <ListItemText primary={`Customer: ${line}`} />
                  </ListItem>
                )) || 'No customer lines available'}
              </List>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default ContactSummary;
