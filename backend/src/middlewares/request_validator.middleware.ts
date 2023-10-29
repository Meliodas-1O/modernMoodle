// Request validator middleware
import Joi from "joi";

// -- Chapters section start
const chaptersGetAllSchema = Joi.object({
    topicId: Joi.number().optional(),
});
// -- Chapters section end

// Export validator
export const validatorMiddleware = {
    chapter: {
        chaptersGetAllSchema,
    }
};