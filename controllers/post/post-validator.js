const Joi = require('joi');


const createPostSchema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),

    active: Joi.boolean().default(true),
    latitude: Joi.number().required(),
    longitude: Joi.number().required()
});


module.exports = { createPostSchema, };