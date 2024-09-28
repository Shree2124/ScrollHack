
import React from 'react';
import {
  Container as MuiContainer,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
  Box,
  CardMedia,
} from '@mui/material';
import { Container } from '../../components';
import { Link, useParams } from 'react-router-dom';


// Temporary data for the course and recommendations
const courseDetails = {
  title: 'Course Title',
  description: 'This is a brief description of the course.',
  imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
};

const recommendations = [
  {
    title: 'Recommended Course 1',
    description: 'Description of recommended course 1.',
    imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
  },
  {
    title: 'Recommended Course 2',
    description: 'Description of recommended course 2.',
    imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
  },
  {
    title: 'Recommended Course 3',
    description: 'Description of recommended course 3.',
    imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
  },
];

const PaymentSuccessPage = () => {
    const {courseId} = useParams()
  return (
    <Container>
    <MuiContainer>
      <Alert severity="success" sx={{ backgroundColor: 'green', color: 'white' }}>
        Payment was successful!
      </Alert>

      <Typography variant="h4" align="center" sx={{ margin: '2rem 0' }}>
        Payment Successful
      </Typography>

      <Card sx={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image={courseDetails.imageUrl}
          alt={courseDetails.title}
        />
        <CardContent>
          <Typography variant="h5">{courseDetails.title}</Typography>
          <Typography variant="body2">{courseDetails.description}</Typography>
        </CardContent>
      </Card>

      <Button variant="contained" color="primary" fullWidth>
        <Link to={`/course-page/${courseId}`}>
        Go to Course Page
        </Link>
      </Button>

      <Typography variant="h6" sx={{ margin: '2rem 0' }}>
        Recommended Courses
      </Typography>

      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{ marginBottom: '2rem' }}
      >
        {recommendations.map((course, index) => (
          <Card key={index} sx={{ display: 'flex', alignItems: 'center' }}>
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image={course.imageUrl}
              alt={course.title}
            />
            <CardContent sx={{display:'flex', flexDirection:'column', flexWrap:'wrap'}}>
              <Typography variant="h6">{course.title}</Typography>
              <Typography variant="body2">{course.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </MuiContainer>
    </Container>
  );
};

export default PaymentSuccessPage;
