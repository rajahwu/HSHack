import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';
import { Form } from 'react-router-dom';

/**
 * Component to add a new lead.
 * @component
 */
const AddLead = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h2" variant="h5">
          Request Leads
        </Typography>
        <Form method="post" style={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="leadCount"
            label="Number of Leads"
            name="leadCount"
            type="number"
            InputProps={{ inputProps: { min: 1 } }}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Find
          </Button>
        </Form>
      </Box>
    </Container>
  );
};

export default AddLead;
