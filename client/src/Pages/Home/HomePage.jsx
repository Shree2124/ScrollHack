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
  backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  margin: 'auto',
  maxWidth: '800px', 
});

const HomePage = () => {
  return (
   
    <Box
      sx={{   
        minHeight:'550px',
        width: '100vw',
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center', 
        overflow: 'hidden',
        marginBottom:'3rem'
      }}
    >
      <AnimatedBox>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our Learning Platform
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Your gateway to knowledge and skill enhancement!
        </Typography>
        <Typography variant="body1" component="p">
          We offer a variety of courses designed to help you learn new skills and advance your career.
          Our platform features interactive content, video tutorials, and comprehensive resources to enhance your learning experience.
        </Typography>
        <Typography variant="body1" component="p">
          Whether you're a beginner or an experienced learner, we have something for everyone.
          Join our community of learners today and start your journey towards mastering new skills!
        </Typography>

          <Button variant="contained" color="primary" size="large">
            <Link to='/login'>
            Get Started
            </Link>
          </Button>
        
      </AnimatedBox>
    </Box>
  );
};

export default HomePage;
