// Request validator middleware
import Joi from "joi";

// -- Chapters section start
const chaptersGetAllSchema = Joi.object({
     topicId: Joi.number().optional(),
});

const chaptersGetByIdSchema = Joi.object({
     id: Joi.number().required(),
});

const chaptersCreateSchema = Joi.object({
     topicId: Joi.number().required(),
     title: Joi.string().required().regex(/^[a-zA-Z0-9]+$/),
     description: Joi.string().required().regex(/^[a-zA-Z0-9]+$/),
});

const chaptersDeleteSchema = Joi.object({
     id: Joi.number().required(),
});

const chaptersUpdateParamsSchema = Joi.object({
     id: Joi.number().required(),
});

const chaptersUpdateBodySchema = Joi.object({
     title: Joi.string().required().regex(/^[a-zA-Z0-9]+$/),
     description: Joi.string().required().regex(/^[a-zA-Z0-9]+$/),
});
// -- Chapters section end

// -- Topics section start

const topicCreationSchema = Joi.object({
     title: Joi.string()
          .required()
          .regex(/^[a-zA-Z0-9]+$/),
     description: Joi.string()
          .required()
          .regex(/^[a-zA-Z0-9]+$/),
});

const topicGetByIdSchema = Joi.object({
     id: Joi.number().required(),
});

const topicUpdateBodySchema = Joi.object({
     title: Joi.string().regex(/^[a-zA-Z0-9]+$/),
     description: Joi.string().regex(/^[a-zA-Z0-9]+$/),
}).or("title", "description");

const topicUpdateParamSchema = Joi.object({
     id: Joi.number().required(),
});

const topicDeleteSchema = Joi.object({
     id: Joi.number().required(),
});
// -- Topics section end

// Export validator
export const validatorMiddleware = {
     chapter: {
          chaptersGetAllSchema,
          chaptersGetByIdSchema,
          chaptersCreateSchema,
          chaptersDeleteSchema,
          chaptersUpdateParamsSchema,
          chaptersUpdateBodySchema,
     },
     topic: {
          topicCreationSchema,
          topicGetByIdSchema,
          topicUpdateBodySchema,
          topicUpdateParamSchema,
          topicDeleteSchema,
     },
};
