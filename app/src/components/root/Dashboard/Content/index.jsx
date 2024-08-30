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

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  // Handle pagination
  const paginatedData = contactHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
                      {paginatedData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar alt={item.participants.customer.name} src={item.participants.customer.photoURL} sx={{ marginRight: '1em' }} />
                              <Typography>{item.participants.customer.name}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {item.type === 'call' ? <CallIcon /> : item.type === 'email' ? <EmailIcon /> : <SmsIcon />}
                          </TableCell>
                          <TableCell>{item.correspondence.content.score}</TableCell>
                          <TableCell>{item.correspondence.content.outcome}</TableCell>
                          <TableCell>
                            <Form action={`/${user.displayName}/call-log/${item.type}/${item.id}`}>
                              <Button type="submit" variant="contained" color="primary">
                                View {item.type}
                              </Button>
                            </Form>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[2, 5, 10]}
                    component="div"
                    count={contactHistory.length}
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
