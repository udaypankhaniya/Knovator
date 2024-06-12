const Joi = require('joi');


const passwordComplexity = Joi.string().min(6).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])')).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.pattern.base': 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
});



const usersRegister = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: passwordComplexity
});

const usersLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});


module.exports = {
    usersRegister,
    usersLogin

}