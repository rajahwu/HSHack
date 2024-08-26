import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Container } from '@mui/material';
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import './utils/getSampleSalesCall';


export default function App() {
    const location = useLocation();
    return (
        <Container>
            <Header location={location} />
            <Box sx={{
                padding: '1em',
                margin: '0.25em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'baseline'
            }}>
                <Outlet />
            </Box>
            <Footer />
        </Container>
    )

}