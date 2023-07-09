// eslint-disable-next-line import/no-extraneous-dependencies
const Joi = require('joi');

// For body data
const createUserBody = Joi.object({
  id: Joi.number(),
  username: Joi.string().max(50).required(),
  email: Joi.string().pattern(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/).required(),
  password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/).required(),
}).required();

const updateUserBody = Joi.object({
  id: Joi.number(),
  old_password: Joi.string(),
  username: Joi.string().max(50),
  email: Joi.string().pattern(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/),
  password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/),
}).or('username', 'email', 'password', 'old_password').required();

const deleteUserBody = Joi.object({
  id: Joi.number(),
  password: Joi.string(),
}).required();

module.exports = {
  createUserBody,
  updateUserBody,
  deleteUserBody,
};
