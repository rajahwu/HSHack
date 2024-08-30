import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import SmsIcon from "@mui/icons-material/Sms";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { Form, NavLink, useLoaderData, Outlet } from "react-router-dom";
import { useAuth } from '../../../../context/AuthContext';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

const LeadsList = () => {
  const { user } = useAuth()
  const leads = useLoaderData();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedLeads = leads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (!leads || leads.length === 0) {
    return <Typography>No leads available.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Leads
      </Typography>
       {user && <Form action={`/${user.displayName}/leads/new`}>
          <Button type="submit" variant="text" color="primary" endIcon={<PersonSearchIcon />}>
            Find Leads
          </Button>
        </Form>}
      </Box>
      <Outlet />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedLeads.map((lead) => (
              <React.Fragment key={lead.id}>
                <TableRow>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>
                    <NavLink>{lead.phoneNumber}</NavLink>
                  </TableCell>
                  <TableCell>
                    <NavLink>{lead.textNumber}</NavLink>
                  </TableCell>
                </TableRow>
                {/* Second row for the buttons */}
                <TableRow>
                  <TableCell colSpan={3}>
                    <Stack direction="row" spacing={1} justifyContent="baseline">
                      {/* Call button */}
                      <Form id="call" method="post">
                        <input type="hidden" name="userId" value={lead.assignedTo} />
                        <input type="hidden" name="leadId" value={lead.id} />
                        <input type="hidden" name="name" value={lead.name} />
                        <input type="hidden" name="phoneNumber" value={lead.phoneNumber} />
                        <Button variant="contained" type="submit">
                          <CallIcon />
                        </Button>
                      </Form>

                      {/* Email button */}
                      <Form id="email" method="post">
                        <input type="hidden" name="userId" value={lead.assignedTo} />
                        <input type="hidden" name="leadId" value={lead.id} />
                        <input type="hidden" name="name" value={lead.name} />
                        <input type="hidden" name="email" value={lead.email} />
                        <Button variant="contained" type="submit">
                          <EmailIcon />
                        </Button>
                      </Form>

                      {/* Text button */}
                      <Form id="text" method="post">
                        <input type="hidden" name="userId" value={lead.assignedTo} />
                        <input type="hidden" name="leadId" value={lead.id} />
                        <input type="hidden" name="name" value={lead.name} />
                        <input type="hidden" name="textNumber" value={lead.textNumber} />
                        <Button variant="contained" type="submit">
                          <SmsIcon />
                        </Button>
                      </Form>
                    </Stack>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[2, 3, 5]}
          component="div"
          count={leads.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default LeadsList;
