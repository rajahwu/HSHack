// components/layouts/Header.jsx
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { links } from '../../../lib/links';

/**
  * Header component displays site links
  *
  * @returns {JSX.Element} The rendered Header component
  */
export default function Header() {
  const { user } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;
  console.log(user);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={NavLink} to="/" sx={{ flexGrow: 1, textDecoration: "none" }}>
          <img src="/assets/chat.png" alt="logo" style={{ width: "30px", height: "30px", marginRight: "10px" }} />
        </Typography>
        {user ? (
          <nav>
            {links.filter((link) => link.auth === true).map((link) =>
              <Button
                key={link.pathname}
                color="inherit"
                component={NavLink}
                to={`${user.displayName}/${link.pathname}`}
              >
                {link.title}
              </Button>)}
          </nav>
        ) : (
          <nav>
            <Button color="inherit" component={NavLink} to="/login">Login</Button>
            <Button color="inherit" component={NavLink} to="/register">Sign Up</Button>
          </nav>

        )}
      </Toolbar>
    </AppBar>
  );
}