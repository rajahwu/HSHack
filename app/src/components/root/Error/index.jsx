import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

/**
 * ErrorPage Component
 * Displays an error message with an option to navigate back to a safe page.
 * @component
 */
const ErrorPage = () => {
  const navigate = useNavigate();

  /**
   * Handles the button click event to navigate to the home page.
   */
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '10vh' }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <ErrorOutlineIcon color="error" style={{ fontSize: 80 }} />
        <Typography variant="h4" color="textPrimary" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          The page you are looking for does not exist or an error has occurred.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;
