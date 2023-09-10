import Joi from "joi";

export const createItinerarySchema = Joi.object({
    name: Joi
        .required()
        .string()
        .min(10)
        .max(50)
        .messages({
            'any.required': 'The name of the itinerary is required',
            'string.empty': 'The name of the itinerary is required',
            'string.min': 'Your name is too short (at least 10 characters)',
            'string.max': 'Your name is too long (up to 50 characters)'
        }),
    coverURL: Joi
        .required()
        .string()
        .uri()
        .messages({
            'any.required': 'Your photo is required',
            'string.empty': 'Your photo is required',
            'string.uri': 'Your photo must have a URL format'
        }),
    duration: Joi
        .required()
        .string()
        .alphanum()
        .messages({
            'any.required': 'The duration of the itinerary is required',
            'string.empty': 'The duration of the itinerary is required',
            'string.alphanum': 'The duration of the itinerary needs to be alpha-numeric'
        }),
    price: Joi
        .required()
        .number()
        .min(1)
        .max(5)
        .messages({
            'any.required': 'The price range of the itinerary is required',
            'number.empty': 'The price range of the itinerary is required',
            'number.min': 'The price range must be between 1 and 5',
            'number.max': 'The price range must be between 1 and 5'
        }),
    activities: Joi
        .required()
        .array()
        .items(Joi.string())
        .min(3)
        .max(7)
        .messages({
            'any.required': 'The itinerary must have activities',
            'array.empty': 'The itinerary must have activities',
            'array.items': 'The activities must be generated as sentences',
            'array.min': 'The itinerary must have at least 3 activities',
            'array.max': 'The itinerary must have no more than 7 activities'
        }),
})

export const updateItinerarySchema = Joi.object({
    name: Joi
        .string()
        .min(10)
        .max(50)
        .messages({
            'string.empty': 'The name of the itinerary is required',
            'string.min': 'Your name is too short (at least 10 characters)',
            'string.max': 'Your name is too long (up to 50 characters)'
        }),
    coverURL: Joi
        .string()
        .uri()
        .messages({
            'string.empty': 'Your photo is required',
            'string.uri': 'Your photo must have a URL format'
        }),
    duration: Joi
        .string()
        .alphanum()
        .messages({
            'string.empty': 'The duration of the itinerary is required',
            'string.alphanum': 'The duration of the itinerary needs to be alpha-numeric'
        }),
    price: Joi
        .number()
        .min(1)
        .max(5)
        .messages({
            'number.empty': 'The price range of the itinerary is required',
            'number.min': 'The price range must be between 1 and 5',
            'number.max': 'The price range must be between 1 and 5'
        }),
    activities: Joi
        .array()
        .items(Joi.string())
        .min(3)
        .max(7)
        .messages({
            'array.empty': 'The itinerary must have activities',
            'array.items': 'The activities must be generated as sentences',
            'array.min': 'The itinerary must have at least 3 activities',
            'array.max': 'The itinerary must have no more than 7 activities'
        }),
})