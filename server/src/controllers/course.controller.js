import { asyncHandler } from "../utils/asyncHandler"
import { Courses } from "../models/courses.model.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { ApiError } from "../utils/apiError.js"
import { Lecture } from "../models/lecture.model.js"
import { User } from "../models/users.model.js"

const getAllCourses = asyncHandler(async (req, res) => {
    const course = await Courses.find();
    res.status(200)
        .json(
            new ApiResponse(201, course, " courses fetched successfully")
        )
})

const getSingleCourse = asyncHandler(async (req, res) => {
    const course = await Courses.findById(req.params.id)
    res.status(200)
        .json(
            new ApiResponse(201, course, " course fetched successfully")
        )
})

const fetchLectures = asyncHandler(async (req, res) => {
    const lecture = await Lecture.findById(req.params.id);

    const user = await User.findById(req.user._id);

    if (user.role === "admin") {
        return res.json({ lecture });
    }

    if (!user.subscription.includes(lecture.course))
        return res.status(400).json({
            message: "You have not subscribed to this course",
        });

    res.status(200).json(new ApiResponse(200, lecture, "Fetched all lectures"));
})

const fetchLecture = asyncHandler(async (req, res) => {
    const lecture = await Lecture.findById(req.params.id);

    const user = await User.findById(req.user._id);

    if (user.role === "admin") {
        return res.json({ lecture });
    }

    if (!user.subscription.includes(lecture.course))
        return res.status(400).json({
            message: "You have not subscribed to this course",
        });

    res.status(200).json(new ApiResponse(200, lecture, "Fetched lecture"));
});

const getMyCourses = asyncHandler(async (req, res) => {
    const courses = await Courses.find({ _id: req.user.subscription });

    res.status(200).json(new ApiResponse(200, courses, "Fetched all lectures"));
})

export {
    getAllCourses
}