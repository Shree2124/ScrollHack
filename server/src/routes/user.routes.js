import { Router } from "express";
import {
    loginUser,
    logoutUser,
    registerUser,
    refreshAccessToken,
    getCurrentUser,
    updateAccountDetails,
    verifyUser
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addProgress, getYourProgress } from "../controllers/course.controller.js";

const router = new Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.post("/verify", verifyUser);

router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account-details").patch(verifyJWT, updateAccountDetails);
router.post("/user/progress", verifyJWT, addProgress);
router.get("/user/progress", verifyJWT, getYourProgress);

export default router;