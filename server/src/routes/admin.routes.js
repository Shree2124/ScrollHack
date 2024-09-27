import express from "express";
import { isAdmin } from "../middlewares/isAuth.js";
import {
  addLectures,
  createCourse,
  deleteLecture,
  deleteCourse,
  getAllStats,
  getAllUser,
  updateRole,
} from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/course/new", verifyJWT, isAdmin, upload.fields([{
    name:"image",
    maxCount: 1
}]), createCourse);
router.post("/course/:id", verifyJWT, isAdmin, upload.fields([{
    name:"video",
    maxCount: 1
}]), addLectures);
router.delete("/lecture/:id", verifyJWT, isAdmin, deleteLecture);
router.delete("/course/:id", verifyJWT, isAdmin, deleteCourse);
router.get("/stats", verifyJWT, isAdmin, getAllStats);
router.put("/user/:id", verifyJWT, updateRole);
router.get("/users", verifyJWT, isAdmin, getAllUser);

export default router;
