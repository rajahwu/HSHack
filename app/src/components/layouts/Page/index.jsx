import { Box } from '@mui/material';
import React from 'react';

/**
  * Page component displays current page content and navigation
  *
  * @returns {JSX.Element} The rendered Page component
  */
const Page = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {children}
    </Box>
  );
}

export default Page;