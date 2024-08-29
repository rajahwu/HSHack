import { Box, Button, Card, CardContent, Grid, Typography, Avatar, Stack } from '@mui/material';
import React from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';

const DashboardContent = () => {
  const { user } = useAuth();
  const { leads, contactHistory } = useLoaderData();

  // Generate some placeholder data for the scores and outcomes
  const placeholderScores = [
    { name: 'Call 1', score: 85 },
    { name: 'Call 2', score: 90 },
    { name: 'Call 3', score: 75 },
    { name: 'Call 4', score: 88 },
  ];

  const placeholderOutcomes = [
    { name: 'Call 1', outcome: 'Success' },
    { name: 'Call 2', outcome: 'Failure' },
    { name: 'Call 3', outcome: 'Success' },
    { name: 'Call 4', outcome: 'Success' },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {/* First Column: Profile Card */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            {user && <img
              src={user.photoURL || 'https://picsum.photos/100'}
              alt={user.displayName}
              style={{ borderRadius: '50%', width: 100, height: 100, marginBottom: '1em' }}
            />}
            <Typography variant="h5">{user ? user.displayName : "🕑"}</Typography>
          </Card>
        </Grid>

        {/* Second Column: Leads */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Leads</Typography>
              {leads.length > 0 ? (
                <Box>
                  <Typography variant="h4">{leads.length}</Typography>
                  <Stack direction="row" spacing={2}>
                    {leads.slice(0, 3).map((lead) => (
                      <Avatar
                        key={lead.id}
                        alt={lead.name}
                        src={lead.photoURL || 'https://picsum.photos/50'}
                      />
                    ))}
                  </Stack>
                </Box>
              ) : (
                user &&
                  <Form action={`/${user.displayName}/leads/new`}>
                    <Button type="submit" variant="contained" color="primary">
                      Add Leads
                    </Button>
                  </Form>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Third Row: Contact History */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Contact History</Typography>
              {contactHistory.length > 0 ? (
                <Grid container spacing={2}>
                  {/* Scores Column */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Scores:</Typography>
                    {placeholderScores.map((item) => (
                      <Typography key={item.name}>{item.name}: {item.score}</Typography>
                    ))}
                  </Grid>
                  
                  {/* Outcomes Column */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Outcomes:</Typography>
                    {placeholderOutcomes.map((item) => (
                      <Typography key={item.name}>{item.name}: {item.outcome}</Typography>
                    ))}
                  </Grid>
                </Grid>
              ) : (
                <Typography>No contact history available.</Typography>
              )}
              {contactHistory.length > 0 && (
                <Form action={`/${user.displayName}/call-log/history`}>
                  <Button type="submit" variant="contained" color="primary">
                    View History
                  </Button>
                </Form>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardContent;
