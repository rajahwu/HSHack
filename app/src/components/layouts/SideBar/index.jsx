import { Box, Button, List, ListItem, Paper, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

/**
  * Sidebar component displays current page navigation
  *
  * @returns {JSX.Element} The rendered SideBar component
  */
export default function SideBar({ title, links }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ padding: '1em', margin: '0.25em', height: '50vh' }}>
      <Typography variant="h4" component="h2">{title}</Typography>
      <List>
        {links.map((link) => (
          <ListItem component={NavLink} to={link.pathname} key={link.pathname}>
            <Button>{link.title}</Button>
            </ListItem>
        ))}
      </List>
      </Paper>
    </Box>
  );
}