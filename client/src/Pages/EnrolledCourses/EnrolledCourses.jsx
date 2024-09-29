import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Container as MuiContainer,
} from "@mui/material";

import axiosInstance from "../../utils/axios";

import LinkComponent from "../../components/LinkComponent";
import { Container } from "../../components";

// eslint-disable-next-line react/prop-types
const CourseCard = ({ course }) => {
 

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderTop: "1px solid #102121", // Visible top border with a defined color
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={course.image}
        alt={course.title}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // Ensures the button stays at the bottom
          flexGrow: 1,
          gap: 2,
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description}
        </Typography>
        <Typography>&#8377;{course.price}</Typography>
    
          <LinkComponent
            color="bg-green-600"
            to={`/course-page/${course?._id}`}
          >
            Continue Course
          </LinkComponent>
         
      </CardContent>
    </Card>
  );
};

const EnrolledCourses = () => {

  const [subscribedCourse, setSubscribedCourse] = useState([]);


  const fetchSubscribedCourses = async () => {
    try {
      const { data } = await axiosInstance.get("/my-courses");
      setSubscribedCourse(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    fetchSubscribedCourses();
  }, []);


  return (
    <Container>
      <MuiContainer sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Enrolled Courses
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 4,
          }}
        >
          {subscribedCourse.map((course) => (
            <Box key={course?._id}>
              <CourseCard
                course={course}
              />
            </Box>
          ))}
        </Box>
      </MuiContainer>
    </Container>
  );
};

export default EnrolledCourses;

