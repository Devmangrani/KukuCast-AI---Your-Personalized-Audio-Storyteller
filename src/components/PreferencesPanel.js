import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box, 
  Slider,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Chip,
  TextField,
  Autocomplete,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Stack,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// List of available categories
const availableCategories = [
  'Motivation', 
  'Fiction', 
  'Personal Development',
  'Business', 
  'Health', 
  'Science', 
  'Technology',
  'Spirituality',
  'News',
  'Sports',
  'Entertainment',
  'Education'
];

// Available mood options
const moodOptions = [
  'energetic',
  'calm',
  'focused',
  'relaxed',
  'inspired',
  'reflective'
];

const PreferencesPanel = ({ open, onClose, userPreferences, updatePreferences }) => {
  // Local state to track changes before applying them
  const [preferences, setPreferences] = useState({ ...userPreferences });

  // Update local preferences when userPreferences change
  useEffect(() => {
    setPreferences({ ...userPreferences });
  }, [userPreferences, open]);

  // Apply changes when user clicks save
  const handleSave = () => {
    updatePreferences(preferences);
    onClose();
  };

  // Reset changes if user cancels
  const handleCancel = () => {
    setPreferences({ ...userPreferences });
    onClose();
  };

  // Handle category changes
  const handleCategoryChange = (event, newValue) => {
    setPreferences({
      ...preferences,
      preferredCategories: newValue
    });
  };

  // Handle duration change
  const handleDurationChange = (event, newValue) => {
    setPreferences({
      ...preferences,
      listeningTime: newValue
    });
  };

  // Handle voice preference change
  const handleVoiceChange = (event) => {
    setPreferences({
      ...preferences,
      preferredVoice: event.target.value
    });
  };

  // Handle mood change
  const handleMoodChange = (event) => {
    setPreferences({
      ...preferences,
      mood: event.target.value
    });
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleCancel}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ 
        background: 'linear-gradient(45deg, rgba(112, 71, 235, 0.05) 0%, rgba(255, 107, 107, 0.05) 100%)',
        py: 2.5
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Box 
              sx={{ 
                backgroundColor: 'primary.main', 
                width: 36, 
                height: 36, 
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                boxShadow: '0 4px 12px rgba(112, 71, 235, 0.2)'
              }}
            >
              <AutoAwesomeIcon sx={{ color: 'white' }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Your KukuCast Preferences
            </Typography>
          </Box>
          <IconButton onClick={handleCancel} sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <Divider />
      
      <DialogContent sx={{ px: 3, py: 4 }}>
        <Stack spacing={4}>
          <Box>
            <Box display="flex" alignItems="center" mb={2}>
              <Typography variant="subtitle1" fontWeight={600} className="gradient-text">
                Content Preferences
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              Select categories you're interested in for your daily content.
            </Typography>
            
            <Autocomplete
              multiple
              value={preferences.preferredCategories}
              onChange={handleCategoryChange}
              options={availableCategories}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  variant="outlined" 
                  label="Categories" 
                  placeholder="Select categories"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip 
                    label={option} 
                    {...getTagProps({ index })} 
                    key={option}
                    className="custom-chip"
                  />
                ))
              }
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </Box>
          
          <Box>
            <Box display="flex" alignItems="center" mb={2}>
              <AccessTimeIcon color="primary" sx={{ mr: 1.5 }} />
              <Typography variant="subtitle1" fontWeight={600}>
                Duration Preference
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              How long would you like your daily KukuCast to be?
            </Typography>
            
            <Box sx={{ px: 2 }}>
              <Slider
                value={preferences.listeningTime}
                onChange={handleDurationChange}
                step={1}
                marks={[
                  { value: 1, label: '1 min' },
                  { value: 3, label: '3 min' },
                  { value: 5, label: '5 min' },
                  { value: 10, label: '10 min' },
                ]}
                min={1}
                max={10}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} min`}
                sx={{
                  '& .MuiSlider-markLabel': {
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                  },
                  '& .MuiSlider-mark': {
                    backgroundColor: '#bbb',
                    height: 8,
                    width: 1,
                    marginTop: -3
                  }
                }}
              />
            </Box>
          </Box>
          
          <Box>
            <Box display="flex" alignItems="center" mb={2}>
              <HeadphonesIcon color="primary" sx={{ mr: 1.5 }} />
              <Typography variant="subtitle1" fontWeight={600}>
                Voice Preference
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              Choose the voice for your audio content.
            </Typography>
            
            <FormControl component="fieldset" sx={{ width: '100%' }}>
              <RadioGroup
                row
                value={preferences.preferredVoice}
                onChange={handleVoiceChange}
                sx={{ 
                  justifyContent: 'space-between',
                  '& .MuiFormControlLabel-root': {
                    flex: 1,
                    margin: 0
                  },
                  '& .MuiRadio-root': {
                    padding: 1
                  }
                }}
              >
                {['male', 'female', 'neutral'].map(voice => (
                  <FormControlLabel 
                    key={voice}
                    value={voice} 
                    control={<Radio color="primary" />} 
                    label={
                      <Box 
                        sx={{ 
                          border: '1px solid',
                          borderColor: preferences.preferredVoice === voice ? 'primary.main' : 'rgba(0, 0, 0, 0.12)',
                          borderRadius: 2,
                          px: 2,
                          py: 1.5,
                          textAlign: 'center',
                          backgroundColor: preferences.preferredVoice === voice ? 'rgba(112, 71, 235, 0.08)' : 'transparent',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: preferences.preferredVoice === voice ? 'rgba(112, 71, 235, 0.12)' : 'rgba(0, 0, 0, 0.04)',
                          }
                        }}
                      >
                        <Typography sx={{ textTransform: 'capitalize', fontWeight: preferences.preferredVoice === voice ? 600 : 400 }}>
                          {voice}
                        </Typography>
                      </Box>
                    }
                    sx={{
                      alignItems: 'flex-start',
                      margin: 0
                    }}
                    labelPlacement="bottom"
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
          
          <Box>
            <Box display="flex" alignItems="center" mb={2}>
              <WhatshotIcon color="primary" sx={{ mr: 1.5 }} />
              <Typography variant="subtitle1" fontWeight={600}>
                Current Mood
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              Select your current mood for more relevant content.
            </Typography>
            
            <FormControl fullWidth>
              <InputLabel id="mood-select-label">Mood</InputLabel>
              <Select
                labelId="mood-select-label"
                id="mood-select"
                value={preferences.mood}
                label="Mood"
                onChange={handleMoodChange}
                sx={{ borderRadius: 2 }}
              >
                {moodOptions.map((mood) => (
                  <MenuItem key={mood} value={mood} sx={{ textTransform: 'capitalize' }}>
                    {mood}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Stack>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3, pt: 0 }}>
        <Button 
          onClick={handleCancel} 
          color="inherit" 
          sx={{ fontWeight: 500 }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained" 
          color="primary"
          sx={{ fontWeight: 600, px: 3, py: 1 }}
          className="hover-float"
        >
          Save Preferences
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PreferencesPanel; 