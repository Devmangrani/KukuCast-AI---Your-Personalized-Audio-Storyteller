import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import './App.css';

// Create a custom theme with Kuku FM brand colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#7047eb', // Purple as primary color
      light: '#9b7dec',
      dark: '#5032a8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff6b6b', // Coral as secondary color
      light: '#ff9999',
      dark: '#cc5454',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f9ff',
      paper: '#ffffff',
    },
    info: {
      main: '#3498db',
    },
    success: {
      main: '#2ecc71',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #5032a8 0%, #7047eb 100%)',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'linear-gradient(45deg, #5032a8 0%, #8363f3 100%)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #ff4b4b 0%, #ff6b6b 100%)',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'linear-gradient(45deg, #ff4b4b 0%, #ff8585 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        thumb: {
          '&:hover, &.Mui-focusVisible': {
            boxShadow: '0 0 0 8px rgba(112, 71, 235, 0.16)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          background: 'linear-gradient(90deg, #5032a8 0%, #7047eb 100%)',
        },
      },
    },
  },
});

function App() {
  // State for user preferences
  const [userPreferences, setUserPreferences] = useState({
    preferredCategories: ['Motivation', 'Fiction', 'Personal Development'],
    listeningTime: 5, // in minutes
    preferredVoice: 'female',
    mood: 'energetic',
  });

  // Mock function to simulate AI generating new content
  const generatePersonalizedContent = () => {
    console.log('Generating personalized content based on user preferences:', userPreferences);
    // In a real app, this would make an API call to an AI service
  };

  // Update user preferences
  const updatePreferences = (newPreferences) => {
    setUserPreferences({
      ...userPreferences,
      ...newPreferences,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Header />
        <Dashboard 
          userPreferences={userPreferences} 
          updatePreferences={updatePreferences}
          generateContent={generatePersonalizedContent}
        />
      </div>
    </ThemeProvider>
  );
}

export default App; 