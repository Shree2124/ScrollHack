import { Courses } from '../models/courses.model.js';
import { User } from '../models/users.model.js';
import { asyncHandler } from './asyncHandler.js';


export const getCourseRecommendations = asyncHandler(async (userId) => {
    try {
        const user = await User.findById(userId).populate('subscription');
        console.log(user);
        

        let tags = [];
        if (user && user.subscription.length>0) {
            tags = user.subscription.flatMap(course => course.tags);
        }
        if (tags?.length===0) {
            tags = ['Programming', 'Web Development', 'Data Science']; 
        }
    
        const recommendedCourses = await Courses.find({
            _id: { $nin: user?.subscription }, 
            tags: { $in: tags }
        }).limit(10);

        console.log(recommendedCourses);
        

        return recommendedCourses
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching recommendations');
    }
});
