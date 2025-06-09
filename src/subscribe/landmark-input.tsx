import React, { useState } from 'react';
import {
  Box,
  TextField,
  Chip,
  Typography,
  IconButton,
  Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface LandmarksInputProps {
  landmarks: string[];
  onChange: (landmarks: string[]) => void;
  error?: string;
}

export const LandmarksInput: React.FC<LandmarksInputProps> = ({
  landmarks,
  onChange,
  error
}) => {
  const [currentLandmark, setCurrentLandmark] = useState('');

  const handleAddLandmark = () => {
    if (currentLandmark.trim() && !landmarks.includes(currentLandmark.trim())) {
      onChange([...landmarks, currentLandmark.trim()]);
      setCurrentLandmark('');
    }
  };

  const handleRemoveLandmark = (indexToRemove: number) => {
    onChange(landmarks.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddLandmark();
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 1 }} gutterBottom>
        Landmarks
      </Typography>
      
      <Grid container spacing={0.3} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs>
          <TextField
            fullWidth
            placeholder="Enter landmark (e.g., Mall, School, Hospital)"
            value={currentLandmark}
            onChange={(e) => setCurrentLandmark(e.target.value)}
            onKeyPress={handleKeyPress}
            error={!!error}
            helperText={error}
            //size="small"
          />
        </Grid>
        <Grid item>
          <IconButton
            onClick={handleAddLandmark}
            disabled={!currentLandmark.trim()}
            color="primary"
            sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'grey.100' } }}
          >
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>

      {landmarks.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {landmarks.map((landmark, index) => (
            <Chip
              key={index}
              label={landmark}
              onDelete={() => handleRemoveLandmark(index)}
              deleteIcon={<DeleteIcon />}
              variant="outlined"
              sx={{ bgcolor: 'white' }}
            />
          ))}
        </Box>
      )}
    </>
  );
};

