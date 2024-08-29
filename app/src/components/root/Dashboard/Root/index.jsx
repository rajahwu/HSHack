import { Box, Paper } from '@mui/material';
import React from 'react';
import { Outlet } from "react-router-dom";
import { Page, SideBar } from '../../../layouts';

const DashboardLinks = [
  { title: "Home", pathname: "" },
  { title: "Profile", pathname: "profile" },
  { title: "Settings", pathname: "settings" },
];

const LeadContactLogServicePage = () => {
  return (
    <Page>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, flexBasis: '25%' }}>
        <SideBar title="Calls" links={DashboardLinks} />
      </Box>
      <Paper sx={{
        display: 'flex',
        flexDirection: 'row',
        flexBasis: 'max-content',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '2.5em',
        gap: 4,
        padding: '1em',
      }}>
        <Outlet />
      </Paper>
    </Page>
  );
};

export default LeadContactLogServicePage;
