import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  TablePagination,
} from '@mui/material';
import React, { useState } from 'react';
import { Form, useLoaderData, NavLink } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
              <Box sx={{ display: "flex" }}>
                <Typography variant="h6">Leads</Typography>
                {leads.length > 0 && user && (
                  <Form action={`/${user.displayName}/leads/new`}>
                    <Tooltip title="find leads">
                      <Button type="submit" variant="text" color="primary">
                        <PersonSearchIcon />
                      </Button>
                    </Tooltip>
                  </Form>
                )}
              </Box>
              {leads.length > 0 ? (
                <Box>
                  <Tooltip title="view leads">
                    <Card component={NavLink} to={`/${user.displayName}/call-log/leads`} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginY: '1em', textDecoration : 'none' }}>
                      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="h4">{leads.length}</Typography>
                      </CardContent>
                    </Card>
                  </Tooltip>
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
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Score</TableCell>
                        <TableCell>Outcome</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedData.map((item) => {
                        const randIdx = Math.floor(Math.random() * (leads.length - 1));
                        const lead = leads[randIdx];
                        return (
                          <TableRow key={item.name}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar alt={lead.name} src={lead.photoURL} sx={{ marginRight: '1em' }} />
                                <Typography>{lead ? lead.name : 'Unknown'}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              {item.type === 'call' ? <CallIcon /> : item.type === 'email' ? <EmailIcon /> : <SmsIcon />}
                            </TableCell>
                            <TableCell>{item.score}</TableCell>
                            <TableCell>{item.outcome}</TableCell>
                            <TableCell>
                              <Form action={`/${user.displayName}/call-log/${item.type}/${item.id}`}>
                                <Button type="submit" variant="contained" color="primary">
                                  View {item.type}
                                </Button>
                              </Form>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[2, 5, 10]}
                    component="div"
                    count={tableData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableContainer>
              ) : (
                <Typography>No contact history available.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardContent;
