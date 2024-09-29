

// import { Container } from "../../components";

// // eslint-disable-next-line react/prop-types
// const CourseCard = ({ course, isSubscribed }) => {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   const makePayment = async () => {
//     try {
//       const stripe = await loadStripe(
//         "pk_test_51Q3viOJHlaDBKxhvGn9mhvR6VLWCbbDdCXpHA5eSYKObsB8nEv1tBHCf91qakpmrMmCCQrw8rDC14ClKzVDlAFth00ihQMdNd0"
//       );

//       const response = await axiosInstance.post(
//         `/course/checkout/${course?._id}`,
//         { id: user?.id }
//       );

//       dispatch(setStripe(response.data.sessionId));

//       const result = stripe?.redirectToCheckout({
//         sessionId: response?.data?.sessionId,
//       });

//       if (result.error) {
//         console.log(result.error);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Card sx={{ height: "100%", display: "flex", flexDirection: "column" ,paddingTop:'1rem', borderTop:'1rem'}}>
//       <CardMedia
//         component="img"
//         height="140"
//         image={course.image}
//         alt={course.title}
//       />
//       <CardContent sx={{ display: "flex", gap: 2, flexDirection: "column", flexGrow: 1 }}>
//         <Typography gutterBottom variant="h5" component="div">
//           {course.title}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {course.description}
//         </Typography>
//         <Typography>&#;{course.price}</Typography>
//         {isSubscribed ? (
//           <LinkComponent
//             color="bg-green-600"
//             to={`/course-page/${course?._id}`}
//           >
//             Continue Course
//           </LinkComponent>
//         ) : (
//           <button
//             onClick={makePayment}
//             className="bg-blue-500 rounded text-white font-bold p-2 text-md mt-2 text-center hover:scale-105 transform transition-transform duration-300"
//           >
//             Buy Course
//           </button>
//         )}
//       </CardContent>
//     </Card>
//   );
// };



import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Container as MuiContainer,
} from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
// import { setCourses } from "../../redux/slices/authSlice";
import LinkComponent from "../../components/LinkComponent";
import { Container } from "../../components";
import { setCourses } from "../../redux/slices/authSlice";

// eslint-disable-next-line react/prop-types
const CourseCard = ({ course, isSubscribed }) => {
  const { user } = useSelector((state) => state.auth);

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51Q3viOJHlaDBKxhvGn9mhvR6VLWCbbDdCXpHA5eSYKObsB8nEv1tBHCf91qakpmrMmCCQrw8rDC14ClKzVDlAFth00ihQMdNd0"
      );

      const response = await axiosInstance.post(
        `/course/checkout/${course?._id}`,
        { id: user?.id }
      );

      // dispatch(setCourses(response.data.sessionId));

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
        {isSubscribed ? (
          <LinkComponent
            color="bg-green-600"
            to={`/course-page/${course?._id}`}
          >
            Continue Course
          </LinkComponent>
        ) : (
          <button
            onClick={makePayment}
            className="bg-blue-500 rounded text-white font-bold p-2 text-md mt-2 text-center hover:scale-105 transform transition-transform duration-300"
          >
            Buy Course
          </button>
        )}
      </CardContent>
    </Card>
  );
};

const Courses = ({ text = "Available Courses" }) => {
  const dispatch = useDispatch()
  const [courseContent, setCourseContent] = useState([]);
  const [subscribedCourse, setSubscribedCourse] = useState([]);

  const fetchCourse = async () => {
    try {
      const res = await axiosInstance.get("/course/all");
      setCourseContent(res.data.data);
      dispatch(setCourses(res.data.data))
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubscribedCourses = async () => {
    try {
      const { data } = await axiosInstance.get("/my-courses");
      setSubscribedCourse(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourse();
    fetchSubscribedCourses();
  }, []);

  const isCourseSubscribed = (courseId) => {
    return subscribedCourse.some((subscribed) => subscribed._id === courseId);
  };

  return (
    <Container>
      <MuiContainer sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {text}
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
          {courseContent.map((course) => (
            <Box key={course?._id}>
              <CourseCard
                course={course}
                isSubscribed={isCourseSubscribed(course._id)}
              />
            </Box>
          ))}
        </Box>
      </MuiContainer>
    </Container>
  );
};

export default Courses;
