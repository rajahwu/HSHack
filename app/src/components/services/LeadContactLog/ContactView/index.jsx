import React from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Box, Button, Card, CardContent, CardMedia, CardActions, IconButton, Typography } from '@mui/material';
import { useLoaderData, Link } from 'react-router-dom';

const ContactView = () => {
  const { salesContact } = useLoaderData();

  // Check the type and status of sales contact
  const contactType = salesContact.type;
  const contactStatus = salesContact.status; // Assuming you have a 'status' field
  const customer = salesContact.participants.customer;

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2, position: 'relative' }}>
      {/* Common UI for all types */}
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={customer.photoURL}
        alt={customer.name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          {/* Conditional Rendering Based on Contact Type */}
          {contactType === 'call' && (
            <>
              <Typography component="h3" variant="h5">{contactStatus === "complete" ? "Finished" : "Calling ..."}</Typography>
              <Typography component="div" variant="h6">
                {customer.phoneNumber}
              </Typography>
            </>
          )}
          {contactType === 'email' && (
            <>
              <Typography component="h3" variant="h5">{contactStatus === "complete" ? "Finished" : "Emailing ..."}</Typography>
              <Typography component="div" variant="h6">
                {customer.email}
              </Typography>
            </>
          )}
          {contactType === 'text' && (
            <>
              <Typography component="h3" variant="h5">{contactStatus === "complete" ? "Finished" : "Texting ..."}</Typography>
              <Typography component="div" variant="h6">
                {customer.textNumber}
              </Typography>
            </>
          )}
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {customer.name}
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

        {/* Add spacing below the media controls when the call is complete */}
        {contactStatus === 'complete' && contactType === 'call' && (
          <Box sx={{ mb: 2 }} /> 
        )} 
      </Box>

     {/* Conditionally Render the 'Review Call Summary' Button at the bottom */}
      {contactStatus === 'complete' && (
        <CardActions sx={{ justifyContent: 'center', width: '100%' }}> {/* Added CardActions and styling */}
          <Button 
            component={Link} 
            to={`/${salesContact.participants.caller.username}/call-log/${contactType}/${salesContact.id}/review`} 
            variant="contained" 
            color="primary"
            fullWidth // Make the button take up the full width
          >
            View {salesContact.type} Summary
          </Button>
        </CardActions>
      )}
    </Card> 
  );
};

export default ContactView;