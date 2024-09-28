import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Container,

} from "@mui/material";
import { Link } from "react-router-dom";
import LinkComponent from "../../components/LinkComponent";


// useEffect(()=>{
// /* for fetching the courses  */
// },[])
// Example data for courses
const courseContent = [
  {
    id: 1,
    title: "Introduction to JavaScript",
    description: "Learn the basics of JavaScript, a powerful and popular language.",
    imageUrl: "https://via.placeholder.com/300",
    price:4000
  },
  {
    id: 2,
    title: "Advanced React",
    description: "Take your React skills to the next level with advanced topics.",
    imageUrl: "https://via.placeholder.com/300",
  },
  {
    id: 3,
    title: "Web Development Bootcamp",
    description: "A comprehensive bootcamp to learn full-stack web development.",
    imageUrl: "https://via.placeholder.com/300",
  },
  {
    id: 4,
    title: "Machine Learning with Python",
    description: "Explore the world of machine learning using Python libraries.",
    imageUrl: "https://via.placeholder.com/300",
  },
];

const CourseCard = ({ course }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={course.imageUrl}
        alt={course.title}
      />
      <CardContent sx={{display:'flex',gap:2, flexDirection:'column'}}>
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description}
        </Typography>
        <Typography> 
        &#8377;{course.price}
        </Typography>
        <LinkComponent color={'bg-green-600'}>Buy Course</LinkComponent>
        </CardContent>
    </Card>
  );
};

const Courses = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Available Courses
      </Typography>
      <Box container spacing={4} sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)", // 1 column on extra-small screens
            sm: "repeat(2, 1fr)", // 2 columns on small screens
            md: "repeat(3, 1fr)", // 3 columns on medium screens
          },
          gap: 4, // Space between grid items
        }}>
        {courseContent.map((course) => (
          <Box item key={course.id} xs={12} sm={6} md={4}>
            <CourseCard course={course} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Courses;
