import { Courses } from "../models/courses.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/users.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const createCourse = asyncHandler(async (req, res) => {
    const { title, description, category, createdBy, duration, price, tags } = req.body;
    let imgLocalFilePath;
    if (req?.files?.image && Array.isArray(req?.files?.image) && req?.files?.image?.length > 0) {
        imgLocalFilePath = req?.files?.image[0]?.path;
    }
    if (!imgLocalFilePath) {
        throw new ApiError(500, "Failed to upload image");
    }

    const uploadImage = await uploadOnCloudinary(imgLocalFilePath);
    if (!uploadImage) {
        throw new ApiError(400, "Image is required");
    }

    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];

    const course = await Courses.create({
        title,
        description,
        category,
        createdBy,
        image: uploadImage?.url,
        duration,
        price,
        tags:tagsArray,
    });
    return res.status(200).json(
        new ApiResponse(201, course, "Course created successfully")
    );
});


const addLectures = asyncHandler(async (req, res) => {
    const course = await Courses.findById(req?.params?.id);

    if (!course)
        return res.status(404).json({
            message: "No Course with this id",
        });

    const { title, description } = req?.body;

    let file;

    if (
        req?.files &&
        Array.isArray(req?.files?.video) &&
        req?.files?.video?.length > 0
    ) {
        file = req?.files?.video[0]?.path;
    }


    if (!file) {
        throw new ApiError(400, "file is required");
    }

    const uploadedFile = await uploadOnCloudinary(file);
    console.log(uploadedFile);


    const lecture = await Lecture.create({
        title,
        description,
        video: uploadedFile?.url,
        course: course._id,
    });

    res.status(201).json({
        message: "Lecture Added",
        lecture,
    });
})

const deleteLecture = asyncHandler(async (req, res) => {
    const lecture = await Lecture.findById(req.params.id);

    rm(lecture.video, () => {
        console.log("Video deleted");
    });

    await lecture.deleteOne();

    res.json({ message: "Lecture Deleted" });
});

const deleteCourse = asyncHandler(async (req, res) => {
    const course = await Courses.findById(req.params.id);

    const lectures = await Lecture.find({ course: course._id });


    lectures.map((lecture) => {
        lecture.video = ""
        console.log("video deleted");
    })

    course.image = "";

    await Lecture.find({ course: req.params.id }).deleteMany();

    await course.deleteOne();

    await User.updateMany({}, { $pull: { subscription: req.params.id } });

    res.json({
        message: "Course Deleted",
    });
});

const getAllStats = asyncHandler(async (req, res) => {
    const totalCourses = (await Courses.find()).length;
    const totalLectures = (await Lecture.find()).length;
    const totalUsers = (await User.find()).length;

    const stats = {
        totalCourses,
        totalLectures,
        totalUsers,
    };

    res.json({
        stats,
    });
});

const getAllUser = asyncHandler(async (req, res) => {
    const users = await User.find({ _id: { $ne: req.user._id } }).select(
        "-password"
    );

    res.json({ users });
});

const updateRole = asyncHandler(async (req, res) => {
    if (req.user.mainrole !== "superadmin")
        return res.status(403).json({
            message: "This endpoint is assign to superadmin",
        });
    const user = await User.findById(req.params.id);

    if (user.role === "user") {
        user.role = "admin";
        await user.save();

        return res.status(200).json({
            message: "Role updated to admin",
        });
    }

    if (user.role === "admin") {
        user.role = "user";
        await user.save();

        return res.status(200).json({
            message: "Role updated",
        });
    }
});

export {
    createCourse,
    addLectures,
    deleteLecture,
    deleteCourse,
    getAllStats,
    getAllUser,
    updateRole
}