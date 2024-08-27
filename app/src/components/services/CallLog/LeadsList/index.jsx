import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import SmsIcon from "@mui/icons-material/Sms";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from "@mui/material";
import React from "react";
import { Form, NavLink, Outlet, useLoaderData } from "react-router-dom";

const cardStyle = {
  margin: "0.25em",
  borderRadius: "5%",
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  maxWidth: '100%',
};

const cardActionAreaStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "lightblue",
  borderRadius: "5% 5% 0 0",
  marginLeft: "auto",
  padding: "0.5em",
};


const LeadsList = () => {
  const leads = useLoaderData();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 600 }}>
      <Typography variant="h4" component="h2">Leads</Typography>
      <Grid container spacing={2}>
        {leads &&
          leads.map((lead) => (
            <Grid item xs={12} sm={6} key={lead.id}>
              <Card sx={cardStyle}>
                <CardActionArea sx={cardActionAreaStyle}>
                  <CardMedia
                    sx={{
                      borderRadius: "50%",
                      width: 50,
                      height: 50,
                      marginLeft: "0.5em",
                    }}
                    component="img"
                    image={lead.photoURL}
                    alt={lead.name}
                  />
                  <CardContent>
                    <Typography>{lead.name}</Typography>
                    <Typography>phone: <NavLink>{lead.phoneNumber}</NavLink></Typography>
                    <Typography>cell: <NavLink>{lead.textNumber}</NavLink></Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Form id="call" method="post">
                    <input type="hidden" name="userId" value={lead.assignedTo} />
                    <input type="hidden" name="leadId" value={lead.id} />
                    <input type="hidden" name="name" value={lead.name} />
                    <input type="hidden" name="phoneNumber" value={lead.phoneNumber} />
                    <Button variant="contained" type="submit">
                      <CallIcon />
                    </Button>
                  </Form>
                  <Form id="call" method="post">
                    <input type="hidden" name="userId" value={lead.assignedTo} />
                    <input type="hidden" name="leadId" value={lead.id} />
                    <input type="hidden" name="name" value={lead.name} />
                    <input type="hidden" name="email" value={lead.email} />
                    <Button variant="contained">
                      <EmailIcon />
                    </Button>
                  </Form>
                  <Form id="call" method="post">
                    <input type="hidden" name="userId" value={lead.assignedTo} />
                    <input type="hidden" name="leadId" value={lead.id} />
                    <input type="hidden" name="name" value={lead.name} />
                    <input type="hidden" name="textNumber" value={lead.textNumber} />
                    <Button variant="contained">
                      <SmsIcon />
                    </Button>
                  </Form>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
      <Outlet />
    </Box>
  );
};

export default LeadsList;
