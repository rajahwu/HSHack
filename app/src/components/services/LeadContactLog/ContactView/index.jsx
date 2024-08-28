import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ContactView = () => {
  const { salesContact } = useLoaderData();

  // Check the type of sales contact (call, email, text)
  const contactType = salesContact.type;

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
      {/* Common UI for all types */}
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={salesContact.customer.photoURL}
        alt={salesContact.customer.name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          {/* Conditional Rendering Based on Contact Type */}
          {contactType === 'call' && (
            <>
              <Typography component="h3" variant="h5">Calling ...</Typography>
              <Typography component="div" variant="h6">
                {salesContact.customer.phoneNumber}
              </Typography>
            </>
          )}
          {contactType === 'email' && (
            <>
              <Typography component="h3" variant="h5">Emailing ...</Typography>
              <Typography component="div" variant="h6">
                {salesContact.customer.email}
              </Typography>
            </>
          )}
          {contactType === 'text' && (
            <>
              <Typography component="h3" variant="h5">Texting ...</Typography>
              <Typography component="div" variant="h6">
                {salesContact.customer.textNumber}
              </Typography>
            </>
          )}
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {salesContact.customer.name}
          </Typography>
        </CardContent>

        {/* Media Controls for Call Type */}
        {contactType === 'call' && (
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <IconButton aria-label="previous">
              <SkipPreviousIcon />
            </IconButton>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
            <IconButton aria-label="next">
              <SkipNextIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default ContactView;
