import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { Form } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  console.log(user);
  const leads = [];
  const contactHistory = [];

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {/* First Column: Profile Card */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            {user && <img
              src={user.displayImage || 'https://picsum.photos/100'}
              alt={user.displayName}
              style={{ borderRadius: '50%', width: 100, height: 100, marginBottom: '1em' }}
            />}
            <Typography variant="h5">{user ? user.displayName : "🕑"}</Typography>
          </Card>
        </Grid>

        {/* Second Column: Leads and Contact History */}
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Leads Card */}
            <Card>
              <CardContent>
                <Typography variant="h6">Leads</Typography>
                {leads.length > 0 ? (
                  <ul>
                    {leads.map((lead) => (
                      <li key={lead.id}>{lead.name}</li>
                    ))}
                  </ul>
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

            {/* Contact History Card */}
            <Card>
              <CardContent>
                <Typography variant="h6">Contact History</Typography>
                {contactHistory.length > 0 ? (
                  <ul>
                    {contactHistory.map((contact) => (
                      <li key={contact.id}>{contact.date}: {contact.summary}</li>
                    ))}
                  </ul>
                ) : (
                  <Typography>No contact history available.</Typography>
                )}
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
