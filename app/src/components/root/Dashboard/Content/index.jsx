import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
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
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Combine scores and outcomes into a single array for the table
  const tableData = placeholderScores.map((score, index) => ({
    ...score,
    outcome: placeholderOutcomes[index].outcome,
  }));

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {/* First Column: Profile Card */}
        <Grid item xs={12} sm={6} display="flex" alignItems="center" justifyContent="center">
          <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            {user && (
              <img
                src={user.photoURL || 'https://picsum.photos/100'}
                alt={user.displayName}
                style={{ borderRadius: '50%', width: 100, height: 100, marginBottom: '1em' }}
              />
            )}
            <Typography variant="h5">{user ? user.displayName : '🕑'}</Typography>
          </Card>
        </Grid>

        {/* Second Column: Leads */}
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

        {/* Third Row: Contact History in a Paginated Table */}
      <Grid item xs={12}>
  <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'baseline' }}>
    <CardContent sx={{ width: '100%' }}>
      <Typography variant="h6">Contact History</Typography>
      {contactHistory.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Outcome</TableCell>
                <TableCell /> {/* For the button */}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => {
                const lead = leads.find((lead) => lead.id === item.leadId);
                return (
                  <TableRow key={item.name}>
                    <TableCell>
                      {item.type === 'call' ? <CallIcon /> : item.type === 'email' ? <EmailIcon /> : <SmsIcon />}
                    </TableCell>
                    <TableCell>
                      {lead && (
                        <Avatar
                          alt={lead.name}
                          src={lead.photoURL || 'https://picsum.photos/50'}
                        />
                      )}
                    </TableCell>
                    <TableCell>{item.score}</TableCell>
                    <TableCell>{item.outcome}</TableCell>
                    <TableCell align="center">
                      <Form action={`/${user.displayName}/call-log/history`}>
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
            rowsPerPageOptions={[5, 10, 25]}
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
