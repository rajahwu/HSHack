// components/layouts/Footer.jsx
import { Box, Link, Typography } from '@mui/material';
import React from 'react';

/**
  * Footer component displays recourse and contact links
  *
  * @returns {JSX.Element} The rendered Footer component
  */
export default function Footer() {
  return (
    <Box
      component="footer"
      bgcolor="primary.main"
      color="primary.contrastText"
      py={3}
      px={2}
      mt="auto"
    >
      <Typography variant="body1" align="center">
        &copy; {new Date().getFullYear()} HSChat. All rights reserved.
      </Typography>
      <Typography variant="body2" align="center">
        <Link href="/privacy" color="inherit" underline="always">Privacy Policy</Link> |
        <Link href="/terms" color="inherit" underline="always" sx={{ mx: 1 }}>Terms of Service</Link>
        <Link href="/contact" color="inherit" underline="always">| Contact Us</Link>
      </Typography>
    </Box>
  );
}