import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Typography } from '@mui/material';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const ContactHistory = () => {
  const { contactHistory } = useLoaderData();
  const [contacts, setContacts] = useState(contactHistory || []);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setContacts(contactHistory);
  }, [contactHistory]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedContacts = contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Call History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.type}</TableCell>
                <TableCell>{dayjs.unix(contact.date.seconds).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                <TableCell>{contact.duration} minutes</TableCell>
                <TableCell>{contact.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={contacts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default ContactHistory;
