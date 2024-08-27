import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

const CallView = () => {
  const location = useLocation();
  const callData = location.state;
  console.log(Object.keys(callData));

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://picsum.photos/50/50" // Replace with dynamic image if available
        alt="Person Name"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="h3" variant="h5">Calling ...</Typography>
          <Typography component="div" variant="h6">
            +122-333-555
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Person Name
          </Typography>
        </CardContent>
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
      </Box>
    </Card>
  );
}

export default CallView;
