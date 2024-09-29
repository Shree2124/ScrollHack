import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Box, LinearProgress, Container as MuiContainer } from "@mui/material";
import axiosInstance from "../../utils/axios";
import { useSelector } from "react-redux";
import { Container } from "../../components";

// Component to display the progress of a course
const CourseProgressCard = ({ course }) => {
  return (
    <Card sx={{ display: "flex", flexDirection: "column", mb: 4 }}>
      <CardMedia component="img" height="140" image={course.image} alt={course.title} />
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h5" component="div">{course.title}</Typography>
        <Typography variant="body2" color="text.secondary">{course.description}</Typography>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Progress: {course.courseProgressPercentage.toFixed(2)}%
          </Typography>
          <LinearProgress variant="determinate" value={course.courseProgressPercentage} />
        </Box>
      </CardContent>
    </Card>
  );
};

// Main Page Component
const UserDetailsPage = () => {
  const { user } = useSelector((state) => state.auth); // Get user details from Redux store
  const [subscribedCourses, setSubscribedCourses] = useState([]);

  // Fetch user's subscribed courses with progress
  const fetchSubscribedCourses = async () => {
    try {
      const { data } = await axiosInstance.get("/my-courses");
      return data.data; // Return the fetched courses
    } catch (error) {
      console.error("Error fetching subscribed courses:", error);
      return []; // Return an empty array on error
    }
  };

  const fetchUserProgress = async () => {
    try {
      const { data } = await axiosInstance.get(`/user/progress?course=${subscribedCourses._id}`);
      return data; // Return the fetched progress data
    } catch (error) {
      console.error("Error fetching user progress:", error);
      return []; // Return an empty array on error
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const courses = await fetchSubscribedCourses();
      const userProgress = await fetchUserProgress();

      // Map progress to courses
      const coursesWithProgress = courses.map(course => {
        const progress = userProgress.find(progress => progress.courseId.toString() === course._id.toString());
        return {
          ...course,
          courseProgressPercentage: progress ? progress.courseProgressPercentage : 0, // Default to 0 if no progress
        };
      });

      setSubscribedCourses(coursesWithProgress);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <MuiContainer sx={{ py: 8 }}>
        {/* User Details Section */}
        <Card sx={{ display: "flex", flexDirection: "column", mb: 8, p: 4, alignItems: "center" }}>
          <Typography variant="h4">{user?.username}</Typography>
          <Typography variant="subtitle1" color="text.secondary">{user?.email}</Typography>
        </Card>

        {/* Subscribed Courses Section */}
        <Typography variant="h4" align="center" gutterBottom>
          Subscribed Courses
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
          {subscribedCourses.length > 0 ? (
            subscribedCourses.map((course) => (
              <CourseProgressCard key={course._id} course={course} />
            ))
          ) : (
            <Typography variant="body1" align="center">
              You have not subscribed to any courses yet.
            </Typography>
          )}
        </Box>
      </MuiContainer>
    </Container>
  );
};

export default UserDetailsPage;
