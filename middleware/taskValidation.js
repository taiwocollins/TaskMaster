// taskValidation.js
const Joi = require("joi");

// Define the validation schema for task creation and updates
const taskSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    "string.base": "Title must be a string",
    "string.min": "Title must be at least 3 characters long",
    "any.required": "Title is required",
  }),
  description: Joi.string().min(5).required().messages({
    "string.base": "Description must be a string",
    "string.min": "Description must be at least 5 characters long",
    "any.required": "Description is required",
  }),
  deadline: Joi.date().iso().required().messages({
    "date.base": "Deadline must be a valid date",
    "any.required": "Deadline is required",
  }),
  priority: Joi.string().valid("high", "medium", "low").required().messages({
    "any.only": "Priority must be one of: high, medium, or low",
    "any.required": "Priority is required",
  }),
});

module.exports = taskSchema;
