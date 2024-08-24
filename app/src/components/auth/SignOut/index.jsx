import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Form } from "react-router-dom";

export default function SignOut() {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ textAlign: "center", mt: 8 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 3,
          p: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Sign Out
        </Typography>
        <Typography variant="body1" paragraph>
          Are you sure you want to sign out?
        </Typography>
        <Form method="post">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Sign Out
          </Button>
        </Form>
      </Box>
    </Container>
  );
}