import { Button, Card, CardContent, List, ListItem, Typography } from '@mui/material';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useEffect, useState } from 'react';
import { fetchCalls } from '../../../../data/call-log';
dayjs.extend(relativeTime);

const CallsMadeList = () => {
  const [calls, setCalls] = useState([]);
  console.log('calls:', calls);

  useEffect(() => {
    // Fetch calls from API
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
      <List>
        {calls && calls.map(call => (
          <ListItem key={call.id}>
            <Card sx={{ margin:'0.5em', borderRadius: "5%" }}>
              <CardContent>
                <Typography>
                  {dayjs(call.date).fromNow()} - Duration: {call.duration} minutes
                </Typography>
                <Typography>
                  {call.recordingUrl && <Button component='a' href={call.recordingUrl} target="_blank" rel="noopener noreferrer">Listen to Recording</Button>}
                  {call.feedback && <Typography>Feedback: {call.feedback}</Typography>}
                </Typography>
              </CardContent>

            </Card>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CallsMadeList;
