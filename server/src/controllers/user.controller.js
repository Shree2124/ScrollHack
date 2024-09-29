import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import jwt from "jsonwebtoken"
import { User } from "../models/users.model.js"
import sendMail from "../middlewares/sendMail.middleware.js"

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating referesh and access token"
        );
    }
};

const options = {
    httpOnly: true,
    secure: true,
};

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password, role } = req.body;
    if (
        [fullName, email, username, password, role].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }
    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    const user = {
        fullName,
        username,
        email,
        password,
        role
    };

    const otp = Math.floor(Math.random() * 1000000);

    const activationToken = jwt.sign(
        {
            user,
            otp,
        },
        process.env.ACTIVATION_SECRET,
        {
            expiresIn: "5m",
        }
    );

    const data = {
        username,
        otp,
    };

    await sendMail(email, "E learning", data);

    res.status(200).json({
        message: "Otp send to your mail",
        activationToken,
    });
})

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username) {
        throw new ApiError(400, "username or email is required");
    }

    const user = await User.findOne({ username });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id
    );

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged In Successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"));
});

const verifyUser = asyncHandler(async (req, res) => {
    const { otp, activationToken } = req.body;
    console.log(otp, activationToken);


    const verify = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);
    console.log(verify);


    if (!verify)
        return res.status(400).json({
            message: "Otp Expired",
        });

    console.log(verify.otp === Number(otp));


    if (!(verify.otp === Number(otp)))
        return res.status(400).json({
            message: "Wrong Otp",
        });

    await User.create({
        username: verify.user.username,
        email: verify.user.email,
        fullName: verify.user.fullName,
        password: verify.user.password,
        role: verify.user.role
    });

    res.json({
        message: "User Registered",
    });
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req?.cookies?.refreshToken || req?.body?.refreshToken;
        console.log(incomingRefreshToken);
        

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true,
        };

        const {
            accessToken,
            newRefreshToken,
        } = await generateAccessAndRefereshTokens(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            );
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email: email,
            },
        },
        { new: true }
    ).select("-password");

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"));
});



export {
    registerUser,
    loginUser,
    logoutUser,
    verifyUser,
    refreshAccessToken,
    getCurrentUser,
    updateAccountDetails
}