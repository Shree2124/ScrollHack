import { asyncHandler } from "../utils/asyncHandler.js"
import { Courses } from "../models/courses.model.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { ApiError } from "../utils/apiError.js"
import { Lecture } from "../models/lecture.model.js"
import { User } from "../models/users.model.js"
import { Progress } from "../models/progress.model.js"
import Stripe from 'stripe';
import { Payment } from "../models/payment.model.js"
import { getCourseRecommendations } from "../utils/getCourseRecommendations.js"
import mongoose from "mongoose"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const getAllCourses = asyncHandler(async (req, res) => {
    const course = await Courses.find();
    res.status(200)
        .json(
            new ApiResponse(201, course, " courses fetched successfully")
        )
})

const getSingleCourse = asyncHandler(async (req, res) => {
    console.log(req.params.id);

    const course = await Courses.findById(req.params.id)
    res.status(200)
        .json(
            new ApiResponse(201, course, " course fetched successfully")
        )
})

const fetchLectures = asyncHandler(async (req, res) => {
    console.log(req.params.id)
    const lecture = await Lecture.find({ course: req.params.id});
    console.log(lecture);
    

    const user = await User.findById(req.user._id);


    if (user.role === "admin" || user.role === "user") {
        return res.json({ lecture });
    }

    if (!user.subscription?.includes(lecture?.course))
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

const checkout = asyncHandler(async (req, res) => {
    try {

        const user = await User.findById(req?.body?.id);
        const course = await Courses.findById(new mongoose.Types.ObjectId(req?.params?.id));

        console.log(user);
        

        if (user?.subscription?.includes(course._id)) {
            return res.status(400).json({
                message: "You already have this course",
            });
        }

        const session = await stripe?.checkout?.sessions?.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: course?.title,
                        },
                        unit_amount: course?.price * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/payment-successful/${course?._id}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/payment-fail/${course?.id}`,
            customer_email: user?.email,
            metadata: {
                courseId: course?._id.toString(),
                userId: user?._id.toString(),
            },
        });

        console.log(session?.id);
        
        

        res.status(201).json({
            sessionId: session?.id,
            url: session?.url,
        });

    } catch (error) {
        console.log(error);

    }

})

const paymentVerification = asyncHandler(async (req, res) => {
    console.log(req?.params);

    const session = await stripe?.checkout?.sessions?.retrieve(req?.params?.id);
    console.log(session);
    

    if (session?.payment_status === 'paid') {
        const courseId = session?.metadata?.courseId;
        const userId = req?.user?.id;
        console.log(userId);
        

        await Payment.create({
            stripe_session_id: session.id,
            payment_status: session.payment_status,
            amount_total: session.amount_total,
            currency: session.currency,
            customer_email: session.customer_email,
            cancel_url: `${process.env.CLIENT_URL}/success`,
            success_url: `${process.env.CLIENT_URL}/cancel`
        });

        

        const user = await User.findById(userId);
        console.log(user);
        
        const course = await Courses.findById(courseId);

        user?.subscription?.push(course?._id);
        await user?.save();

        console.log("user ",user);
        

        await Progress.create({
            course: course._id,
            completedLectures: [],
            user: userId,
        });

        const recommendedCourses = await getCourseRecommendations(userId);
        console.log("rec ",recommendedCourses);
        

        res.status(200).json({
            message: "Course Purchased Successfully",
            recommendedCourses: recommendedCourses
        });
    } else {
        return res.status(400).json({
            message: "Payment Failed",
        });
    }
})

const addProgress = asyncHandler(async (req, res) => {
    const progress = await Progress.findOne({
        user: req.user._id,
        course: req.query.course,
    });
    const { lectureId } = req.query;
    if (progress.completedLectures.includes(lectureId)) {
        return res.json({
            message: "Progress recorded",
        });
    }
    progress.completedLectures.push(lectureId);
    await progress.save();

    res.status(201).json({
        message: "new Progress added",
    });
});

const getYourProgress = asyncHandler(async (req, res) => {
    const progress = await Progress.find({
        user: req.user._id,
        course: req.query.course,
    });

    if (!progress) return res.status(404).json({ message: "null" });

    const allLectures = (await Lecture.find({ course: req.query.course })).length;

    const completedLectures = progress[0].completedLectures.length;

    const courseProgressPercentage = (completedLectures * 100) / allLectures;

    res.json({
        courseProgressPercentage,
        completedLectures,
        allLectures,
        progress,
    });
});

const fetchCourseRecommendations = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const recommendations = await getCourseRecommendations(userId)

    return res.status(200).json({ recommendations });
});


export {
    getAllCourses,
    getSingleCourse,
    fetchLecture,
    fetchLectures,
    getMyCourses,
    checkout,
    paymentVerification,
    addProgress,
    getYourProgress,
    fetchCourseRecommendations
}