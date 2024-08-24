// components/layouts/Header.jsx
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const locationPropType = PropTypes.shape({
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  state: PropTypes.any,
  key: PropTypes.string.isRequired,
});

Header.propTypes = {
  location: locationPropType.isRequired,
};

export default function Header({ location }) {
  const { user } = useAuth();
  const pathname = location.pathname;
  console.log("Header:", user, pathname);
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={NavLink} to="/" sx={{ flexGrow: 1, textDecoration: "none" }}>
          <img src="/assets/chat.png" alt="logo" style={{ width: "30px", height: "30px", marginRight: "10px" }} />
        </Typography>
          <nav>
            <Button color="inherit" component={NavLink} to="/login">Login</Button>
            <Button color="inherit" component={NavLink} to="/register">Sign Up</Button>
          </nav>
      </Toolbar>
    </AppBar>
  );
}