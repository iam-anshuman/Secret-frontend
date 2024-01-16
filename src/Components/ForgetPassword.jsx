import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NavBar from './NavBar';
import isEmail from 'validator/lib/isEmail';

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



export default function ForgetPassword() {

  const [email,setEmail] = React.useState('')




  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!isEmail(email)){
      alert('Invalid Email');
      setEmail('');
      return;
    }else{
      const response =  await fetch('http://localhost:8080/auth/forget-password',{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email})
      })
      const json = await response.json();
      setEmail('');
      if(response.ok){
        console.log(json);
      }
      if(!response.ok){
        console.log(json);
      }
    }

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
              value = {email}
              onChange={(e)=>setEmail(e.target.value)}
              autoFocus
              />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
              Send Reset Email
            </Button>
          </Box>
        </Box>
        
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
}