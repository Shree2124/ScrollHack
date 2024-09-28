import client from './recombee.js';
import pkg from 'recombee-api-client';
import { Courses } from '../models/courses.model.js';
import { asyncHandler } from './asyncHandler.js';

import Recombee from 'recombee-api-client';
const rqs = Recombee.requests;

export const getCourseRecommendations = asyncHandler(async (userId) => {
    try {
        const recommendations = await client.send(new Recombee.rqs.RecommendItemsToUser(userId, 5));
        const recommendedCourseIds = recommendations.recommendations.map(rec => rec.id);
        
        console.log('Recommended Course IDs:', recommendedCourseIds); 

        return recommendedCourseIds.map(id => mongoose.Types.ObjectId(id));
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching recommendations');
    }
});
