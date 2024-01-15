import React,{useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Key as KeyIcon } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import {useLogOut} from "../hooks/useLogOut";
import { useAuthContext } from '../hooks/useAuthContext';


function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const { logout } = useLogOut();

  const handleLogOut = () => {
    logout();
    handleCloseUserMenu();
    // window.location.reload();
    navigate('/');
  }

  const handleOpenNavMenu = (event) => {
    console.log(event.currentTarget);
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () =>{
    navigate('/login');
  }

  const handleSignup = () =>{
    navigate('/signup');
  }

  return (
    <Box component={"nav"}>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <KeyIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Secrets
          </Typography>

          <Box sx={{ flexGrow: 1, display: {xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
            <MenuIcon />
            </IconButton>
            { 
              !user && 
              <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
              >
              <Button variant='outlined' sx={{display:"block",m:2,}} onClick={handleLogin}>Login</Button>
              <Divider/>
              <Button variant='outlined' sx={{display:"block",m:2,}} onClick={handleSignup}>SignUp</Button>
            </Menu>
      }
          </Box>
          <KeyIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Secrets
          </Typography>

{!user &&
          <Box sx={{ flexGrow: 0, marginLeft:"auto", display: { xs: 'none', md: 'block' } }}>
              <Button variant='contained' sx={{mx:1}} onClick={handleLogin}>Login</Button>
              <Button variant='contained' sx={{mx:1}} onClick={handleSignup}>SignUp</Button>
          </Box>
}


{user &&
        <Box sx={{marginLeft:"auto"}}>
          <Typography variant='body1' sx={{display:"inline",mx:2}}>{user.email}</Typography>
          <Box sx={{ flexGrow: 0,display:"inline" }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={user.email} src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
              <MenuItem  onClick={handleLogOut}>
                <Typography textAlign="center">LogOut</Typography>
              </MenuItem>
          </Menu>
        </Box>
        </Box>
}


        </Toolbar>
      </Container>
    </AppBar>
    </Box>
  );
}
export default NavBar;
