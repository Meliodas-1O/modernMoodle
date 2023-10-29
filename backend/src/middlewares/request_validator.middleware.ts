// Request validator middleware
import Joi from "joi";

// -- Chapters section start
const chaptersGetAllSchema = Joi.object({
    topicId: Joi.number().optional(),
});

const chaptersGetById = Joi.object({
    id: Joi.number().required(),
});

const chaptersCreate = Joi.object({
    topicId: Joi.number().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
});

const chaptersDelete = Joi.object({
    id: Joi.number().required(),
});

const chaptersUpdateParams = Joi.object({
    id: Joi.number().required(),
});

const chaptersUpdateBody = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
});
// -- Chapters section end

// Export validator
export const validatorMiddleware = {
    chapter: {
        chaptersGetAllSchema,
        chaptersGetById,
        chaptersCreate,
        chaptersDelete,
        chaptersUpdateParams,
        chaptersUpdateBody,
    }
};