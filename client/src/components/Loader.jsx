import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',  // Full viewport height
        flexDirection: 'column',
        backgroundColor: '#f5f5f5', // Soft background color
      }}
    >
      {/* Circular spinner */}
      <CircularProgress
        size={80} // Spinner size
        thickness={5} // Thickness of the spinner
        sx={{
          color: '#3f51b5', // Custom color
          marginBottom: 2,  // Space between spinner and text
        }}
      />
      {/* Loading text */}
      <Typography variant="h6" align="center" sx={{ color: '#3f51b5' }}>
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default Loader;
