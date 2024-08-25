import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import SmsIcon from "@mui/icons-material/Sms";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchLeads } from "../../../../data/call-log";

const LeadsList = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    // Fetch leads from API
    const fetchLeadsData = async () => {
      try {
        const response = await fetchLeads();
        setLeads(response);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeadsData();
  }, []);

  return (
    <div>
      <h2>Leads</h2>
      <List>
        {leads &&
          leads.map((lead) => (
            <ListItem key={lead.id}>
              <Card sx={{ margin: "0.5em", borderRadius: "5%" }}>
                <CardActionArea
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "lightblue",
                    borderRadius: "5% 5% 0 0",
                    marginLeft: "auto",
                  }}
                >
                  <CardMedia
                    sx={{
                      borderRadius: "50%",
                      width: 50,
                      height: 50,
                      marginLeft: "0.5em",
                    }}
                    component="img"
                    image="https://picsum.photos/50/50"
                    alt={lead.name}
                  />
                  <CardContent>
                    <Typography>{lead.name}</Typography>
                    <Typography>{lead.contact}</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button variant="contained">
                    <CallIcon />
                  </Button>
                  <Button variant="contained">
                    <EmailIcon />
                  </Button>
                  <Button variant="contained">
                    <SmsIcon />
                  </Button>
                </CardActions>
              </Card>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default LeadsList;
