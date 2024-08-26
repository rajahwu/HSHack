import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Box, Card, CardContent, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import React from 'react';
const CallView = () => {
  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="h3" variant="h5">Calling ...</Typography>
          <Typography component="div" variant="h5">
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
    </Card >
  );
}

export default CallView;