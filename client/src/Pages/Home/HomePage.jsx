import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { keyframes } from '@mui/system';

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled components
const AnimatedBox = styled(Box)({
  animation: `${fadeIn} 1s ease-in-out`,
  textAlign: 'center',
  color: 'white',
  padding: '20px',
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
  borderRadius: '8px',
});

const HomePage = () => {
  return (
    <Box
      sx={{
        backgroundImage: 'url("/path/to/your/background.jpg")', // Replace with your background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden', // Hide overflow
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AnimatedBox>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our Learning Platform
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Your gateway to knowledge and skill enhancement!
        </Typography>
        <Typography variant="body1" paragraph>
          We offer a variety of courses designed to help you learn new skills and advance your career.
          Our platform features interactive content, video tutorials, and comprehensive resources to enhance your learning experience.
        </Typography>
        <Typography variant="body1" paragraph>
          Whether you're a beginner or an experienced learner, we have something for everyone.
          Join our community of learners today and start your journey towards mastering new skills!
        </Typography>
        <Link to="/courses" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" size="large">
            Get Started
          </Button>
        </Link>
      </AnimatedBox>
    </Box>
  );
};

export default HomePage;
