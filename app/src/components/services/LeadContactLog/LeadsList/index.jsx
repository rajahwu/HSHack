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
} from "@mui/material";
import React, { useState } from "react";
import { Form, NavLink, useLoaderData, Outlet } from "react-router-dom";

const LeadsList = () => {
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
      <Typography variant="h4" component="h2" gutterBottom>
        Leads
      </Typography>
        <Outlet />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Cell</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>
                  <NavLink>{lead.phoneNumber}</NavLink>
                </TableCell>
                <TableCell>
                  <NavLink>{lead.textNumber}</NavLink>
                </TableCell>
                <TableCell>
                  <Form id="call" method="post">
                    <input type="hidden" name="userId" value={lead.assignedTo} />
                    <input type="hidden" name="leadId" value={lead.id} />
                    <input type="hidden" name="name" value={lead.name} />
                    <input type="hidden" name="phoneNumber" value={lead.phoneNumber} />
                    <Button variant="contained" type="submit">
                      <CallIcon />
                    </Button>
                  </Form>
                  <Form id="email" method="post">
                    <input type="hidden" name="userId" value={lead.assignedTo} />
                    <input type="hidden" name="leadId" value={lead.id} />
                    <input type="hidden" name="name" value={lead.name} />
                    <input type="hidden" name="email" value={lead.email} />
                    <Button variant="contained" type="submit">
                      <EmailIcon />
                    </Button>
                  </Form>
                  <Form id="text" method="post">
                    <input type="hidden" name="userId" value={lead.assignedTo} />
                    <input type="hidden" name="leadId" value={lead.id} />
                    <input type="hidden" name="name" value={lead.name} />
                    <input type="hidden" name="textNumber" value={lead.textNumber} />
                    <Button variant="contained" type="submit">
                      <SmsIcon />
                    </Button>
                  </Form>
                </TableCell>
              </TableRow>
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
