import React from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import { Container, Typography, Paper, Box, List, ListItem, ListItemText, Divider, Card, CardHeader, CardContent, Avatar } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';

dayjs.extend(relativeTime);
dayjs.extend(duration);

const ContactSummary = () => {
  const { contactId } = useParams();
  const { salesContact, correspondence } = useLoaderData();

  if (!salesContact || !correspondence) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4">Data not found</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 2, textAlign: 'center', color: '#3f51b5', textTransform: 'uppercase' }}>
          {salesContact.type} Summary
        </Typography>

        <Box sx={{ mb: 4, p: 2, borderRadius: 2, backgroundColor: '#fff' }}>
          <Typography variant="h5" sx={{ mb: 2, borderBottom: '1px solid #ddd', pb: 1 }}>
            Contact Details
          </Typography>
          <Typography><strong>Date:</strong> {salesContact.date ? dayjs(salesContact.date.seconds * 1000).format('MMMM D, YYYY h:mm A') : 'N/A'}</Typography>
          <Typography><strong>Type:</strong> {salesContact.type || 'N/A'}</Typography>
          <Typography><strong>Duration:</strong> {salesContact.duration ? dayjs.duration(salesContact.duration, 'seconds').humanize() : 'N/A'}</Typography>
          <Typography><strong>Status:</strong> {salesContact.status || 'N/A'}</Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardHeader title="Participants" sx={{ backgroundColor: '#3f51b5', color: '#fff' }} />
            <Box sx={{ display: 'flex', p: 2 }}>
              <CardContent sx={{ flex: 1 }}>
                <Avatar alt={salesContact.participants.caller.username} src={salesContact.participants.caller.avatar} sx={{ mb: 1 }} />
                <Typography variant="body1"><strong>Caller:</strong> {salesContact.participants.caller.username || 'N/A'}</Typography>
              </CardContent>
              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
              <CardContent sx={{ flex: 1 }}>
                <Avatar alt={salesContact.participants.customer.name} src={salesContact.participants.customer.photoURL} sx={{ mb: 1 }} />
                <Typography variant="body1"><strong>Customer:</strong> {salesContact.participants.customer.name || 'N/A'}</Typography>
              </CardContent>
            </Box>
          </Card>
        </Box>

        {correspondence && correspondence.content && (
          <>
            <Divider sx={{ my: 4 }} />
            <Box sx={{ mb: 4, p: 2, borderRadius: 2, backgroundColor: '#fff' }}>
              <Typography variant="h5" sx={{ mb: 2, borderBottom: '1px solid #ddd', pb: 1 }}>
                Correspondence Details
              </Typography>
              <Typography><strong>Score:</strong> {correspondence.content.score || 'N/A'}</Typography>
              <Typography><strong>Outcome:</strong> {correspondence.content.outcome || 'N/A'}</Typography>
            </Box>

            <Box sx={{ mb: 4, p: 2, borderRadius: 2, backgroundColor: '#fff' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Conversation
              </Typography>
              <List>
                {correspondence.content.script?.caller?.map((line, index) => (
                  <ListItem key={`caller-${index}`}>
                    <ListItemText primary={`Caller: ${line}`} />
                  </ListItem>
                )) || 'No caller lines available |'}{" "}
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
