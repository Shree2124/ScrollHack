import { Router } from "express";
import {
    loginUser,
    logoutUser,
    registerUser,
    refreshAccessToken,
    getCurrentUser,
    updateAccountDetails,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = new Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);


router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account-details").patch(verifyJWT, updateAccountDetails);

export default router;