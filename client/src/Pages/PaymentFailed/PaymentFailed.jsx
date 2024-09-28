import React from 'react';
import {
  Container as MuiContainer,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
  CardMedia,
} from '@mui/material';
import { Container } from '../../components';
import { Link, useParams } from 'react-router-dom';


const courseDetails = {
  title: 'Course Title',
  description: 'This is a brief description of the course for which the payment failed.',
  imageUrl: 'https://via.placeholder.com/150',
};

const PaymentFailurePage = () => {
    const {courseId} = useParams()
  return (
    <Container>
    <MuiContainer>
      <Alert severity="error" sx={{ backgroundColor: 'red', color: 'white', marginBottom: 2 }}>
        Payment failed. Please try again.
      </Alert>

      <Typography variant="h4" align="center" sx={{ margin: '2rem 0' }}>
        Payment Failed
      </Typography>

      <Card sx={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image={courseDetails.imageUrl}
          alt={courseDetails.title}
        />
        <CardContent>
          <Typography 
            variant="h5" 
            sx={{ 
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' } 
            }}
          >
            {courseDetails.title}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } 
            }}
          >
            {courseDetails.description}
          </Typography>
        </CardContent>
      </Card>

      <Button variant="contained" color="primary" fullWidth >
        <Link to={`/all-courses`}>
        Go to All Courses
        </Link>
      </Button>
      </MuiContainer>
    </Container>
  );
};

export default PaymentFailurePage;
