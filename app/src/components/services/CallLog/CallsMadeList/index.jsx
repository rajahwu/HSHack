import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useEffect, useState } from 'react';
import { fetchCalls } from '../../../../data/call-log';

dayjs.extend(relativeTime);

const cardStyle = {
  margin: "0.5em",
  borderRadius: "5%",
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const cardMediaStyle = {
  borderRadius: "50%",
  width: 50,
  height: 50,
  marginLeft: "0.5em",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
};

const cardActionAreaStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "lightblue",
  borderRadius: "5% 5% 0 0",
  marginLeft: "auto",
};

const CallsMadeList = () => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    const fetchCallsData = async () => {
      try {
        const response = await fetchCalls();
        setCalls(response);
      } catch (error) {
        console.error('Error fetching calls:', error);
      }
    };

    fetchCallsData();
  }, []);

  return (
    <div>
      <h2>Call History</h2>
      <Grid container spacing={2}>
        {calls && calls.map(call => (
          <Grid item xs={12} sm={6} key={call.id}>
            <Card sx={cardStyle}>
              <CardActionArea sx={cardActionAreaStyle}>
                <CardMedia
                  sx={cardMediaStyle}
                  component="div"
                >
                  <Typography variant="h6">
                    {call.score || "N/A"}
                  </Typography>
                </CardMedia>
                <CardContent>
                  <Typography>
                    {dayjs(call.date).fromNow()}
                  </Typography>
                  <Typography>
                    {call.duration} minutes
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                {call.recordingUrl ? (
                  <Button component='a' href={call.recordingUrl} target="_blank" rel="noopener noreferrer">
                    View Call Summary
                  </Button>
                ) : (
                  <Button>
                    View Feedback
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CallsMadeList;
