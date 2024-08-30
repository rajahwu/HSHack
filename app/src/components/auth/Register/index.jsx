import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography
} from "@mui/material";
import * as React from "react";
import { Form } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        HSForce
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


/**
  * Register component displays user registration form
  *
  * @returns {JSX.Element} The rendered Registration component
  */
export default function Register() {
  const { user } = useAuth();

  if (user) {
    return (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              You are already signed in.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              You are already signed in. Please{" "}
              <Link href="/dashboard">go to your dashboard</Link> or{" "}
              <Link href="/logout">sign out</Link> if you wish to log in with a
              different account.
            </Typography>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
  }

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
           Register
          </Typography>
          <Form method="post" action={"/register"} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}