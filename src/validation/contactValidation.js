import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least {#limit} characters long',
    'string.max': 'Name must not exceed {#limit} characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Phone number must be a string',
    'string.min': 'Phone number must be at least {#limit} characters long',
    'string.max': 'Phone number must not exceed {#limit} characters',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().messages({
    'string.email': 'Invalid email address',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'The "Is favourite" field must be a boolean value',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'string.base': 'Contact type must be a string',
      'any.required': 'Contact type is required',
    }),
  userId: Joi.string().required(), // нова властивість
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least {#limit} characters long',
    'string.max': 'Name must not exceed {#limit} characters',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'Phone number must be a string',
    'string.min': 'Phone number must be at least {#limit} characters long',
    'string.max': 'Phone number must not exceed {#limit} characters',
  }),
  email: Joi.string().email().messages({
    'string.email': 'Invalid email address',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'The "Is favourite" field must be a boolean value',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'string.base': 'Contact type must be a string',
  }),
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be filled',
  });
