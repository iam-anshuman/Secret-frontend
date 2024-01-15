import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NavBar from './NavBar';
import { useSignUp } from '../hooks/useSignUp';
import {Link as RouteLink, useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Secrets
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function  SignUp() {

const {signup, isLoading, Error} = useSignUp();
const navigate = useNavigate();


  const handleSubmit = async(event) => {

    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const fullname = data.get("fullname");
    const email = data.get("email");
    const password = data.get("password");

    await signup(fullname,email,password);
    navigate('/');
  };

  return (
    <>
    <NavBar/>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="fullname"
                  required
                  fullWidth
                  id="fullname"
                  label="Full Name"
                  autoFocus
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  />
              </Grid>
            </Grid>

{isLoading?
            <Button
            disabled
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              >
              Sign Up
            </Button> 
            :
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
            Sign Up
            </Button>
} 
            
            <Grid container justifyContent="flex-end">
              <Grid item>
                <RouteLink to="/login" variant="body2">
                  Already have an account? Sign in
                </RouteLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {
            Error &&
            <Box sx={{
                border: '1px solid red',
                padding: '10px',
                marginTop: '10px',
                color:'red',
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                width: '100%',
                justifyItems: 'center',
            }}>
                {Error}
            </Box>
        }

        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  );
}