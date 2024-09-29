import { useEffect, useState } from "react";
import {
  Container as MuiContainer,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
  Box,
  CardMedia,
} from "@mui/material";
import { Container } from "../../components";
import { Link, useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";

const courseDetails = {
  title: "Course Title",
  description: "This is a brief description of the course.",
  imageUrl: "https://via.placeholder.com/150", // Replace with actual image URL
};

const recommendations = [
  {
    title: "Recommended Course 1",
    description: "Description of recommended course 1.",
    imageUrl: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    title: "Recommended Course 2",
    description: "Description of recommended course 2.",
    imageUrl: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    title: "Recommended Course 3",
    description: "Description of recommended course 3.",
    imageUrl: "https://via.placeholder.com/150", // Replace with actual image URL
  },
];

const PaymentSuccessPage = () => {
  const location = useLocation();
  const { courseId } = useParams(); // Get the courseId from the URL params
  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function to extract query parameters
  const getQueryParams = (query) => {
    return new URLSearchParams(query);
  };

  const verification = async () => {
    try {
      if (sessionId) {
        setLoading(true);
        const response = await axiosInstance.post(`/verification/${sessionId}`);
        console.log(response.data);
        setLoading(false);
      } else {
        console.log("Session ID not found");
      }
    } catch (error) {
      console.error(error);
      setError(error.response ? error.response.data.message : "Payment verification failed.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const queryParams = getQueryParams(location.search);
    const session_id = queryParams.get("session_id");
    console.log("Session ID from URL: ", session_id);

    if (session_id) {
      setSessionId(session_id);
      verification();
    } else {
      setLoading(false);
      setError("No session ID found.");
    }
  }, [sessionId]);

  if (loading) {
    return (
      <Container>
        <Typography variant="h5">Loading....</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <MuiContainer>
        {error && (
          <Alert severity="error" sx={{ backgroundColor: "red", color: "white" }}>
            {error}
          </Alert>
        )}

        <Alert severity="success" sx={{ backgroundColor: "green", color: "white" }}>
          Payment was successful!
        </Alert>

        <Typography variant="h4" align="center" sx={{ margin: "2rem 0" }}>
          Payment Successful
        </Typography>

        <Card sx={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
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
          <Link to={`/course-page/${courseId}`} style={{ color: "white", textDecoration: "none" }}>
            Go to Course Page
          </Link>
        </Button>

        <Typography variant="h6" sx={{ margin: "2rem 0" }}>
          Recommended Courses
        </Typography>

        <Box display="flex" flexDirection="column" gap={2} sx={{ marginBottom: "2rem" }}>
          {recommendations.map((course, index) => (
            <Card key={index} sx={{ display: "flex", alignItems: "center" }}>
              <CardMedia
                component="img"
                sx={{ width: 150 }}
                image={course.imageUrl}
                alt={course.title}
              />
              <CardContent sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
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
