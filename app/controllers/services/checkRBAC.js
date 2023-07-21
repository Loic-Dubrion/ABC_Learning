// Import environment variables
require('dotenv').config();

// Import libraries
const jwt = require('jsonwebtoken');

// Import errors
const { Error401, Error403 } = require('../../errors');

/**
 * Middleware to check the role of the user
 * @async
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
const checkRole = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error401('No token provided');
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = decodedToken.data;

    // If user has 'admin' role, do not check the user ID.
    if (user.roles.includes('admin')) {
      next();
    } else if (!user || user.id !== Number(req.params.userId)) {
      throw new Error403('Forbidden');
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to check the permissions of the user
 * @async
 * @param {string} permissionNeeded - Permission needed to access a route
 * @returns {function} Express middleware function
 */
const checkPermission = (permissionNeeded) => async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new Error401('No token provided');
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = decodedToken.data;

    if (!user.permissions || !user.permissions.includes(permissionNeeded)) {
      throw new Error403('Forbidden');
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  checkRole,
  checkPermission,
};
