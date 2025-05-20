import Joi from "joi";

export const userValidator = Joi.object({
    name: Joi.string().min(3).max(10).required().messages({
        "string.min": "name can be at least 3 chars",
        "string.max": "name cannot be more then 10 chars",
    }),
    phone:Joi.string().pattern(/^\+380[0-9]{9}$/).required().messages({
        "string.pattern.base": "the phone number is entered incorrectly. ",
    }),
    email:Joi.string().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required().messages({
        "string.pattern.base": "the email number is entered incorrectly. ",
    }),

})