import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Container,
  Button,
} from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "../../utils/axios";
import { useSelector } from "react-redux";

let courseContent = [
  {
    id: 1,
    title: "Introduction to JavaScript",
    description:
      "Learn the basics of JavaScript, a powerful and popular language.",
    image: "https://via.placeholder.com/300",
    price: 4000,
  },
  {
    id: 2,
    title: "Advanced React",
    description:
      "Take your React skills to the next level with advanced topics.",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 3,
    title: "Web Development Bootcamp",
    description:
      "A comprehensive bootcamp to learn full-stack web development.",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 4,
    title: "Machine Learning with Python",
    description:
      "Explore the world of machine learning using Python libraries.",
    image: "https://via.placeholder.com/300",
  },
];

const fetchCourse = async () => {
  try {
    await axiosInstance.get("/course/all").then((res) => {
      console.log(res);
      courseContent = [...courseContent, ...res.data.data];
      console.log(courseContent);
    });
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line react/prop-types
const CourseCard = ({ course }) => {
  const { user } = useSelector((state) => state.auth);

  const makePayment = async () => {
    try {
      // eslint-disable-next-line no-undef
      const stripe = await loadStripe(
        "pk_test_51Q3viOJHlaDBKxhvGn9mhvR6VLWCbbDdCXpHA5eSYKObsB8nEv1tBHCf91qakpmrMmCCQrw8rDC14ClKzVDlAFth00ihQMdNd0"
      );

      console.log(course);
      

      const response = await axiosInstance.post(
        `/course/checkout/${course?._id}`,
        {
          id: user?.id,
        }
      );

      console.log(response);

      const result = stripe?.redirectToCheckout({
        sessionId: response?.data?.sessionId,
      });

      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("course", course);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={course.image}
        alt={course.title}
      />
      <CardContent sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description}
        </Typography>
        <Typography>&#8377;{course.price}</Typography>
        <Button color={"bg-green-600"} onClick={makePayment}>
          Buy Course
        </Button>
      </CardContent>
    </Card>
  );
};

const Courses = () => {
  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Available Courses
      </Typography>
      <Box
        container
        spacing={4}
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
        {courseContent.map((course) => (
          <Box item key={course?.id} xs={12} sm={6} md={4}>
            <CourseCard course={course} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Courses;
