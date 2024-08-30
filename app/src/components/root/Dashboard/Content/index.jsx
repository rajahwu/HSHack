import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  Stack,
} from '@mui/material';
import React, { useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';

const DashboardContent = () => {
  const { user } = useAuth();
  const { leads, contactHistory } = useLoaderData();

  // Placeholder data with leadId associations
  const placeholderScores = [
    { name: 'Call 1', score: 85, type: 'call', leadId: 1 },
    { name: 'Call 2', score: 90, type: 'call', leadId: 2 },
    { name: 'Call 3', score: 75, type: 'email', leadId: 3 },
    { name: 'Call 4', score: 88, type: 'text', leadId: 4 },
  ];

  const placeholderOutcomes = [
    { name: 'Call 1', outcome: 'Success', type: 'call' },
    { name: 'Call 2', outcome: 'Failure', type: 'call' },
    { name: 'Call 3', outcome: 'Success', type: 'email' },
    { name: 'Call 4', outcome: 'Success', type: 'text' },
  ];

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  // Combine scores and outcomes into a single array
  const tableData = placeholderScores.map((score, index) => ({
    ...score,
    outcome: placeholderOutcomes[index].outcome,
  }));

  // Handle pagination
  const paginatedData = tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {/* Profile Card */}
        <Grid item xs={12} sm={6} display="flex" justifyContent="center">
          <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            {user && (
              <Avatar
                src={user.photoURL || 'https://picsum.photos/100'}
                alt={user.displayName}
                sx={{ width: 100, height: 100, marginBottom: '1em' }}
              />
            )}
            <Typography variant="h5">{user ? user.displayName : '🕑'}</Typography>
          </Card>
        </Grid>

        {/* Leads Card */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6">Leads</Typography>
              {leads.length > 0 ? (
                <Box>
                  <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginY: '1em' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="h4">{leads.length}</Typography>
                    </CardContent>
                  </Card>
                  <Stack direction="row" spacing={1}>
                    {leads.slice(0, 3).map((lead) => (
                      <Avatar key={lead.id} alt={lead.name} src={lead.photoURL || 'https://picsum.photos/50'} />
                    ))}
                  </Stack>
                </Box>
              ) : (
                user && (
                  <Form action={`/${user.displayName}/leads/new`}>
                    <Button type="submit" variant="contained" color="primary">
                      Add Leads
                    </Button>
                  </Form>
                )
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Contact History */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>Contact History</Typography>
              {contactHistory.length > 0 ? (
                <Grid container spacing={2}>
                  {paginatedData.map((item) => {
                    // const lead = leads.find((lead) => lead.id === item.leadId);
                    const randIdx = (Math.floor(Math.random() * (leads.length - 1)));
                    const lead = leads[randIdx];
                    return (
                      <Grid item xs={12} sm={6} key={item.name}>
                        <Card sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                              <Typography variant="body1">{lead ? lead.name : 'Unknown'}</Typography>
                              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                              <Avatar alt={lead.name} src={lead.photoURL} />

                              {item.type === 'call' ? <CallIcon /> : item.type === 'email' ? <EmailIcon /> : <SmsIcon />}
                              </Box>
                            </Grid>
                            <Grid item xs>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "baseline", justifyContent: "baseline", marginLeft: "0.5em" }}>

                              <Typography variant="body2">Score: {item.score}</Typography>
                              <Typography variant="body2">Outcome: {item.outcome}</Typography>
                              </Box>
                            </Grid>
                            <Grid item>
                              <Form action={`/${user.displayName}/call-log/${item.type}/${item.id}`}>
                                <Button type="submit" variant="contained" color="primary">
                                  View {item.type}
                                </Button>
                              </Form>
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              ) : (
                <Typography>No contact history available.</Typography>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</Button>
                <Typography sx={{ marginX: 2 }}>Page {page + 1}</Typography>
                <Button onClick={() => setPage(page + 1)} disabled={(page + 1) * rowsPerPage >= tableData.length}>Next</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardContent;
