import React from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton,
  Avatar,
  Tooltip,
  Badge,
  Container
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Header = () => {
  return (
    <AppBar position="static" elevation={0} className="fade-in">
      <Container maxWidth="xl">
        <Toolbar>
          <Box display="flex" alignItems="center">
            {/* Logo/Brand */}
            <Typography
              variant="h5"
              component="div"
              sx={{ 
                fontWeight: 700, 
                display: 'flex', 
                alignItems: 'center',
                mr: 1
              }}
            >
              <Box 
                component="span" 
                sx={{ 
                  color: '#fff',
                  background: 'linear-gradient(45deg, rgba(255,107,107,1) 30%, rgba(112,71,235,1) 90%)',
                  borderRadius: '50%',
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 1.5,
                  boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
                  fontSize: '1.5rem'
                }}
              >
                K
              </Box>
              <span style={{ 
                backgroundImage: 'linear-gradient(120deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Kuku FM
              </span>
            </Typography>
            
            {/* KukuCast AI Product Badge */}
            <Box 
              sx={{ 
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(5px)',
                px: 2,
                py: 0.5,
                borderRadius: 6,
                ml: 2,
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <AutoAwesomeIcon fontSize="small" sx={{ mr: 0.8 }} />
              <Typography variant="subtitle2" fontWeight="600">
                KukuCast AI
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          
          {/* Navigation Items */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            <Button 
              color="inherit" 
              startIcon={<HomeIcon />}
              sx={{ 
                borderRadius: 2, 
                px: 2, 
                py: 1,
                backgroundColor: 'rgba(255,255,255,0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                }
              }}
            >
              Home
            </Button>
            
            <Button 
              color="inherit" 
              startIcon={<HeadphonesIcon />}
              sx={{ 
                borderRadius: 2, 
                px: 2, 
                py: 1,
                backgroundColor: 'rgba(255,255,255,0)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                }
              }}
            >
              Library
            </Button>
            
            <Button 
              color="inherit" 
              startIcon={<SearchIcon />}
              sx={{ 
                borderRadius: 2, 
                px: 2, 
                py: 1,
                backgroundColor: 'rgba(255,255,255,0)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                }
              }}
            >
              Discover
            </Button>
            
            <Tooltip title="Notifications">
              <IconButton color="inherit" sx={{ ml: 1 }}>
                <Badge badgeContent={3} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Your Profile">
              <Avatar 
                sx={{ 
                  width: 38, 
                  height: 38, 
                  ml: 1,
                  border: '2px solid rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: '0 0 0 2px rgba(255,255,255,0.4)'
                  }
                }}
              >
                <AccountCircleIcon />
              </Avatar>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 