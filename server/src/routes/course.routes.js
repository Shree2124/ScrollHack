import express from "express";
import {
  getAllCourses,
  getSingleCourse,
  fetchLectures,
  fetchLecture,
  getMyCourses,
  checkout,
  paymentVerification,
  fetchCourseRecommendations,
} from "../controllers/course.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.get("/course/all", getAllCourses);
router.get("/course/:id", getSingleCourse);
router.get("/lectures/:id", verifyJWT, fetchLectures);
router.get("/lecture/:id", verifyJWT, fetchLecture);
router.get("/my-courses", verifyJWT, getMyCourses);
router.post("/course/checkout/:id", checkout);
router.post("/verification/:id", paymentVerification);
router.get("/recommendation",verifyJWT,fetchCourseRecommendations);

export default router;
