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
import { useLogIn } from '../hooks/useLogIn';
import { Link as RouteLink,useNavigate } from 'react-router-dom';

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



export default function LogIn() {

    const {login,isLoading,Error} = useLogIn();
    const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    await login(email,password);
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
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
{ isLoading? 
        <Button
            disabled
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
              Log In
            </Button>
            :
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
            Log In
          </Button>
}
            <Grid sx={{display:"flex"}} container>
              <Grid item xs>
                <RouteLink to="/forget-password" variant="body2">
                  Forgot password?
                </RouteLink>
              </Grid>
              <Grid item>
                <RouteLink to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
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
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
}
