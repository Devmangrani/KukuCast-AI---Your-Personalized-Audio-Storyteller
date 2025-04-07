import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Divider,
  Chip,
  CircularProgress,
  Slider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  LinearProgress
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RefreshIcon from '@mui/icons-material/Refresh';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PreferencesPanel from './PreferencesPanel';
import { mockEpisodes } from '../mockData';

const Dashboard = ({ userPreferences, updatePreferences, generateContent }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [recommendedEpisodes, setRecommendedEpisodes] = useState([]);
  const [showPreferencesPanel, setShowPreferencesPanel] = useState(false);

  // Simulate loading content when the component mounts
  useEffect(() => {
    setIsLoading(true);
    
    // Mock API call to get personalized content
    setTimeout(() => {
      setIsLoading(false);
      setCurrentEpisode(mockEpisodes[0]);
      setRecommendedEpisodes(mockEpisodes.slice(1, 4));
    }, 1500);
  }, []);

  // Simulate playback progress
  useEffect(() => {
    let interval;
    if (isPlaying && currentEpisode) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prevProgress + 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, currentEpisode]);

  // Generate new content handler
  const handleGenerateNewContent = () => {
    setIsLoading(true);
    setIsPlaying(false);
    setProgress(0);
    
    // Call the generate content function (would be an API call in a real app)
    generateContent();
    
    // Simulate API response
    setTimeout(() => {
      setIsLoading(false);
      // Rotate the episodes to simulate new content
      const rotatedEpisodes = [...recommendedEpisodes, currentEpisode];
      setCurrentEpisode(rotatedEpisodes[0]);
      setRecommendedEpisodes(rotatedEpisodes.slice(1, 4));
    }, 2000);
  };

  // Toggle play/pause
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Container sx={{ py: 4, flexGrow: 1 }} className="fade-in">
      <Grid container spacing={3}>
        {/* Left column - Today's KukuCast */}
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              mb: 4, 
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(231, 234, 253, 0.7)'
            }}
          >
            <Box display="flex" alignItems="center" mb={3}>
              <Box 
                sx={{ 
                  backgroundColor: 'primary.main', 
                  width: 36, 
                  height: 36, 
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  boxShadow: '0 4px 12px rgba(112, 71, 235, 0.2)'
                }}
              >
                <AutoAwesomeIcon sx={{ color: 'white' }} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }} className="gradient-text">
                  Today's KukuCast
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your personalized {userPreferences.listeningTime}-minute audio designed just for you
                </Typography>
              </Box>
            </Box>

            {/* Current Episode Card */}
            <Card 
              className="interactive-card"
              sx={{ 
                mb: 4, 
                height: '100%',
                backgroundImage: currentEpisode ? 
                  'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://source.unsplash.com/random/800x400/?abstract)' : 
                  'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: currentEpisode ? 'white' : 'inherit',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                minHeight: 320,
                border: 'none',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {/* Animated gradient overlay */}
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(80, 50, 168, 0.4) 0%, rgba(255, 75, 75, 0.4) 100%)',
                  opacity: 0.6,
                  mixBlendMode: 'overlay',
                }}
              />
              
              <CardContent sx={{ position: 'relative', zIndex: 2 }}>
                {isLoading ? (
                  <Box 
                    display="flex" 
                    justifyContent="center" 
                    alignItems="center"
                    height={200}
                  >
                    <Box textAlign="center">
                      <CircularProgress color="secondary" size={60} thickness={4} />
                      <Typography variant="body1" sx={{ mt: 3, fontWeight: 500 }}>
                        Generating your personalized audio...
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                        Analyzing your preferences and crafting a unique story
                      </Typography>
                    </Box>
                  </Box>
                ) : currentEpisode ? (
                  <>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Chip 
                        icon={<AutoAwesomeIcon />} 
                        label="AI Generated" 
                        size="small"
                        sx={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(5px)',
                          color: 'white',
                          fontWeight: 500,
                          borderRadius: 3,
                          border: '1px solid rgba(255, 255, 255, 0.3)'
                        }} 
                      />
                      <Tooltip title="Generate new content">
                        <IconButton 
                          size="small" 
                          sx={{ 
                            color: 'white',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(5px)',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            }
                          }}
                          onClick={handleGenerateNewContent}
                        >
                          <RefreshIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    
                    <Typography variant="h5" gutterBottom fontWeight={600}>
                      {currentEpisode.title}
                    </Typography>
                    
                    <Stack direction="row" spacing={2} mb={2}>
                      <Chip 
                        icon={<AccessTimeIcon fontSize="small" />} 
                        label={`${currentEpisode.duration} min`} 
                        size="small"
                        sx={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          color: 'white',
                          fontWeight: 500,
                          backdropFilter: 'blur(5px)'
                        }} 
                      />
                      <Chip 
                        icon={<FavoriteIcon fontSize="small" />} 
                        label={currentEpisode.category}
                        size="small" 
                        sx={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          color: 'white',
                          fontWeight: 500,
                          backdropFilter: 'blur(5px)'
                        }} 
                      />
                    </Stack>
                    
                    <Typography variant="body1" sx={{ mb: 3, opacity: 0.9, lineHeight: 1.6 }}>
                      {currentEpisode.description}
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <Slider
                        size="small"
                        value={progress}
                        max={100}
                        sx={{
                          color: 'secondary.main',
                          '& .MuiSlider-thumb': {
                            width: 12,
                            height: 12,
                            backgroundColor: '#fff',
                            boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.3)',
                            '&:hover, &.Mui-focusVisible': {
                              boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.4)',
                            },
                          },
                          '& .MuiSlider-rail': {
                            opacity: 0.5,
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                          },
                        }}
                      />
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          {Math.floor(progress / 100 * currentEpisode.duration * 60)}s
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          {currentEpisode.duration}:00 min
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Button 
                      variant="contained" 
                      color="secondary"
                      startIcon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                      onClick={togglePlayback}
                      fullWidth
                      size="large"
                      className="hover-float"
                      sx={{ 
                        py: 1.2, 
                        fontWeight: 600,
                        boxShadow: '0 6px 12px rgba(255, 107, 107, 0.3)',
                        borderRadius: 3
                      }}
                    >
                      {isPlaying ? 'Pause' : 'Play Now'}
                    </Button>
                  </>
                ) : (
                  <Typography>No episode available</Typography>
                )}
              </CardContent>
            </Card>

            {/* Recommended Episodes */}
            <Box>
              <Box display="flex" alignItems="center" mb={3}>
                <Box 
                  sx={{ 
                    backgroundColor: 'primary.light', 
                    width: 32, 
                    height: 32, 
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                    boxShadow: '0 4px 8px rgba(112, 71, 235, 0.15)'
                  }}
                >
                  <FavoriteIcon fontSize="small" sx={{ color: 'white' }} />
                </Box>
                <Typography variant="h6" fontWeight={600}>
                  Recommended For You
                </Typography>
              </Box>
              
              <Grid container spacing={2.5}>
                {recommendedEpisodes.map((episode) => (
                  <Grid item xs={12} sm={4} key={episode.id}>
                    <Card 
                      className="interactive-card" 
                      sx={{ 
                        height: '100%', 
                        borderRadius: 3, 
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
                          '& .episode-image': {
                            transform: 'scale(1.05)'
                          },
                          '& .play-overlay': {
                            opacity: 1
                          }
                        }
                      }}
                    >
                      <Box 
                        className="episode-image"
                        sx={{ 
                          height: 140, 
                          background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://source.unsplash.com/random/400x200/?${episode.category.toLowerCase()})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          position: 'relative',
                          transition: 'transform 0.5s ease',
                        }}
                      >
                        {/* Play overlay */}
                        <Box 
                          className="play-overlay"
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            opacity: 0,
                            transition: 'opacity 0.3s ease'
                          }}
                        >
                          <IconButton 
                            sx={{ 
                              backgroundColor: 'secondary.main', 
                              color: 'white',
                              '&:hover': {
                                backgroundColor: 'secondary.dark',
                                transform: 'scale(1.1)'
                              },
                              transition: 'transform 0.2s ease',
                            }}
                          >
                            <PlayArrowIcon />
                          </IconButton>
                        </Box>
                        
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                            p: 2,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end'
                          }}
                        >
                          <Chip 
                            label={episode.category} 
                            size="small" 
                            sx={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              backdropFilter: 'blur(5px)',
                              color: '#333',
                              fontWeight: 500,
                              fontSize: '0.7rem',
                              height: 24
                            }} 
                          />
                          <Chip 
                            icon={<AccessTimeIcon sx={{ fontSize: '0.7rem !important' }} />}
                            label={`${episode.duration} min`} 
                            size="small" 
                            sx={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              backdropFilter: 'blur(5px)',
                              color: '#333',
                              fontWeight: 500,
                              fontSize: '0.7rem',
                              height: 24,
                              '& .MuiChip-icon': {
                                color: 'primary.main'
                              }
                            }} 
                          />
                        </Box>
                      </Box>
                      
                      <CardContent sx={{ p: 2 }}>
                        <Typography 
                          variant="subtitle1" 
                          gutterBottom 
                          fontWeight={600} 
                          sx={{ 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            lineHeight: 1.4,
                            minHeight: 42
                          }}
                        >
                          {episode.title}
                        </Typography>
                        
                        <Box
                          sx={{
                            height: 2,
                            width: 40,
                            backgroundColor: 'primary.light',
                            mb: 1.5,
                            borderRadius: 1
                          }}
                        />
                        
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ 
                            maxHeight: 60,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical'
                          }}
                        >
                          {episode.description}
                        </Typography>
                      </CardContent>
                      
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'flex-end',
                          p: 1.5,
                          pt: 0
                        }}
                      >
                        <Button 
                          size="small" 
                          color="primary"
                          variant="text"
                          sx={{ 
                            fontWeight: 500,
                            textTransform: 'none',
                            fontSize: '0.8rem'
                          }}
                        >
                          Add to Queue
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Right column - Preferences & Stats */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              mb: 3, 
              borderRadius: 3,
              p: 3,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(231, 234, 253, 0.7)'
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight={600}>Your Preferences</Typography>
              <Button 
                size="small" 
                onClick={() => setShowPreferencesPanel(true)}
                variant="outlined"
                color="primary"
                sx={{ borderRadius: 2, fontWeight: 500 }}
                className="hover-float"
              >
                Edit
              </Button>
            </Box>
            
            <Box mb={3}>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Categories
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                {userPreferences.preferredCategories.map((category) => (
                  <Chip 
                    key={category} 
                    label={category} 
                    size="small" 
                    className="custom-chip"
                  />
                ))}
              </Box>
            </Box>
            
            <Box mb={3}>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Duration
              </Typography>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  backgroundColor: 'rgba(112, 71, 235, 0.08)', 
                  p: 1.5, 
                  borderRadius: 2,
                  gap: 1.5
                }}
              >
                <AccessTimeIcon color="primary" />
                <Typography variant="body1" fontWeight={500}>
                  {userPreferences.listeningTime} minutes
                </Typography>
              </Box>
            </Box>
            
            <Box mb={3}>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Voice
              </Typography>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  backgroundColor: 'rgba(112, 71, 235, 0.08)', 
                  p: 1.5, 
                  borderRadius: 2,
                  gap: 1.5
                }}
              >
                <StarIcon color="primary" />
                <Typography variant="body1" fontWeight={500} sx={{ textTransform: 'capitalize' }}>
                  {userPreferences.preferredVoice}
                </Typography>
              </Box>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Current Mood
              </Typography>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  backgroundColor: 'rgba(112, 71, 235, 0.08)', 
                  p: 1.5, 
                  borderRadius: 2,
                  gap: 1.5
                }}
              >
                <WhatshotIcon color="primary" />
                <Typography variant="body1" fontWeight={500} sx={{ textTransform: 'capitalize' }}>
                  {userPreferences.mood}
                </Typography>
              </Box>
            </Box>
          </Paper>
          
          {/* Stats Card */}
          <Paper 
            elevation={0} 
            sx={{ 
              borderRadius: 3,
              p: 3,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(231, 234, 253, 0.7)'
            }}
          >
            <Box display="flex" alignItems="center" mb={3}>
              <Box 
                sx={{ 
                  backgroundColor: 'secondary.main', 
                  width: 36, 
                  height: 36, 
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  boxShadow: '0 4px 12px rgba(255, 107, 107, 0.2)'
                }}
              >
                <TrendingUpIcon sx={{ color: 'white' }} />
              </Box>
              <Typography variant="h6" fontWeight={600}>
                Your Stats
              </Typography>
            </Box>
            
            <Stack spacing={3}>
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body2" color="text.secondary">Listening Streak</Typography>
                  <Box display="flex" alignItems="center">
                    <WhatshotIcon fontSize="small" color="secondary" sx={{ mr: 0.5 }} />
                    <Typography variant="body1" fontWeight="bold">3 days</Typography>
                  </Box>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={30} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4, 
                    bgcolor: 'rgba(255, 107, 107, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      background: 'linear-gradient(45deg, #ff4b4b 0%, #ff6b6b 100%)',
                    }
                  }} 
                />
              </Box>
              
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body2" color="text.secondary">Total Listening Time</Typography>
                  <Box display="flex" alignItems="center">
                    <AccessTimeIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
                    <Typography variant="body1" fontWeight="bold">43 minutes</Typography>
                  </Box>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={60} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4, 
                    bgcolor: 'rgba(112, 71, 235, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      background: 'linear-gradient(45deg, #5032a8 0%, #7047eb 100%)',
                    }
                  }} 
                />
              </Box>
              
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body2" color="text.secondary">Episodes Completed</Typography>
                  <Box display="flex" alignItems="center">
                    <EmojiEventsIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
                    <Typography variant="body1" fontWeight="bold">9</Typography>
                  </Box>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={45} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4, 
                    bgcolor: 'rgba(112, 71, 235, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      background: 'linear-gradient(45deg, #5032a8 0%, #7047eb 100%)',
                    }
                  }} 
                />
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Preferences Panel */}
      <PreferencesPanel 
        open={showPreferencesPanel}
        onClose={() => setShowPreferencesPanel(false)}
        userPreferences={userPreferences}
        updatePreferences={updatePreferences}
      />
    </Container>
  );
};

export default Dashboard; 