
// import React from "react";
// import {
//   Container as MUIContainer,
//   Typography,
//   Card,
//   CardContent,
//   Button,
//   Box,
// } from "@mui/material";

// import { Container } from "../../components";
// const PaymentSuccessful = () => {
//   // Example course details (replace with actual data from your API)
//   const courseDetails = {
//     title: "React for Beginners",
//     description:
//       "Learn the basics of React, a popular JavaScript library for building user interfaces.",
//     price: "$49.99",
//     instructor: "Jane Doe",
//   };

//   // Temporary data for recommended courses
//   const recommendedCourses = [
//     {
//       id: 1,
//       title: "Advanced React",
//       description: "Deep dive into React with advanced concepts.",
//       price: "$69.99",
//       instructor: "John Smith",
//     },
//     {
//       id: 2,
//       title: "JavaScript Essentials",
//       description: "Master the fundamentals of JavaScript.",
//       price: "$39.99",
//       instructor: "Alice Johnson",
//     },
//     {
//       id: 3,
//       title: "Web Development Bootcamp",
//       description:
//         "Become a full-stack web developer in this comprehensive course.",
//       price: "$99.99",
//       instructor: "Emily Davis",
//     },
//   ];

//   return (
//     <Container>
//       <MUIContainer maxWidth="lg" sx={{ marginTop: 4 }}>
//         <Box
//           sx={{
//             backgroundColor: "green",
//             color: "white",
//             padding: 2,
//             borderRadius: 1,
//             textAlign: "center",
//             marginBottom: 3,
//           }}
//         >
//           <Typography variant="h5">Payment Successful!</Typography>
//         </Box>
//         <Typography variant="h4" gutterBottom align="center">
//           Thank You for Your Purchase
//         </Typography>
//         <Card sx={{ marginTop: 2 }}>
//           <CardContent>
//             <Typography variant="h5" gutterBottom>
//               Course Details
//             </Typography>
//             <Typography variant="h6">{courseDetails.title}</Typography>
//             <Typography variant="subtitle1" color="text.secondary">
//               Instructor: {courseDetails.instructor}
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               {courseDetails.description}
//             </Typography>
//             <Typography variant="h6" color="primary">
//               Price: {courseDetails.price}
//             </Typography>
//           </CardContent>
//         </Card>
//         <Box display="flex" justifyContent="center" mt={3}>
//           <Button
//             variant="contained"
//             color="primary"
//             //   onClick={handleRedirect}
//           >
//             Go to Course
//           </Button>
//         </Box>

//         {/* Recommendations Section */}
//         <Typography
//           variant="h5"
//           gutterBottom
//           align="center"
//           sx={{ marginTop: 4 }}
//         >
//           Recommended Courses
//         </Typography>
//         <Box
//           container
//           spacing={3}
//           display="flex"
//           flexDirection="column"
//           gap={2}
//           sx={{ marginBottom: "2rem" }}
//         >
//           {recommendedCourses.map((course) => (
          
//               <Card key={course.id}>
//                 <CardContent>
//                   <Typography variant="h6">{course.title}</Typography>
//                   <Typography variant="subtitle1" color="text.secondary">
//                     Instructor: {course.instructor}
//                   </Typography>
//                   <Typography variant="body2">{course.description}</Typography>
//                   <Typography
//                     variant="h6"
//                     color="primary"
//                     sx={{ marginTop: 1 }}
//                   >
//                     Price: {course.price}
//                   </Typography>
//                 </CardContent>
//               </Card>
           
//           ))}
//         </Box>
//       </MUIContainer>
//     </Container>
//   );
// };

// export default PaymentSuccessful;

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
