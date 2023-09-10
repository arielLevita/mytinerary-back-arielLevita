import Joi from "joi";

export const createUserSchema = Joi.object({
    email: Joi
        .required()
        .string()
        .email({
            minDomainSgments: 2
        })
        .messages({
            'any.required': 'Your email is required',
            'string.empty': 'Your email is required',
            'string.email': 'Invalid email'
        }),
    password: Joi
        .required()
        .string()
        .min(8)
        .max(35)
        // .regex(/^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^!#%]*[!#%])[A-Za-z0-9!#%]$/gm)
        .alphanum()
        .messages({
            'any.required': 'Password required',
            'string.empty': 'Password required',
            'string.min': 'Your password is too short (at least 8 characters)',
            'string.max': 'Your password is too long (up to 35 characters)',
            // 'string.regex': 'Your password must include at least 1 lower-case letter, 1 upper-case letter, 1 number and 1 special character (only the following special characters are allowed: !#%).',
            'string.alphanum': 'Your password needs to be alpha-numeric'
        }),
    name: Joi
        .required()
        .string()
        .min(2)
        .max(50)
        .messages({
            'any.required': 'Your name is required',
            'string.empty': 'Your name is required',
            'string.min': 'Your name is too short (at least 2 characters)',
            'string.max': 'Your name is too long (up to 50 characters)'
        }),
    photo: Joi
        .required()
        .string()
        .uri()
        .messages({
            'any.required': 'Your photo is required',
            'string.empty': 'Your photo is required',
            'string.uri': 'Your photo must have a URL format'
        })
})

export const updateUserSchema = Joi.object({
    email: Joi
        .string()
        .email({
            minDomainSgments: 2
        })
        .messages({
            'string.empty': 'Your email is required',
            'string.email': 'Invalid email'
        }),
    password: Joi
        .string()
        .min(8)
        .max(35)
        // .regex(/^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^!#%]*[!#%])[A-Za-z0-9!#%]$/gm)
        .alphanum()
        .messages({
            'string.empty': 'Password required',
            'string.min': 'Your password is too short (at least 8 characters)',
            'string.max': 'Your password is too long (up to 35 characters)',
            // 'string.regex': 'Your password must include at least 1 lower-case letter, 1 upper-case letter, 1 number and 1 special character (only the following special characters are allowed: !#%).',
            'string.alphanum': 'Your password needs to be alpha-numeric'
        }),
    name: Joi
        .string()
        .min(2)
        .max(50)
        .messages({
            'string.empty': 'Your name is required',
            'string.min': 'Your name is too short (at least 2 characters)',
            'string.max': 'Your name is too long (up to 50 characters)'
        }),
    photo: Joi
        .string()
        .uri()
        .messages({
            'string.empty': 'Your photo is required',
            'string.uri': 'Your photo must have a URL format'
        })
})

