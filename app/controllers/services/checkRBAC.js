// Import environment variables
require('dotenv').config();

// Import libraries
const jwt = require('jsonwebtoken');
// const auth = require('./jwtService');

// Import errors
const { Error401, Error403 } = require('../../errors');

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

// const checkRole = (roleNeeded) => async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) {
//     throw new Error401('No token provided');
//   }

//   try {
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     const user = decodedToken.data; // Get user data from the decoded token
//     if (!user.roles || !user.roles.includes(roleNeeded)) {
//       throw new Error403('Forbidden');
//     }

//     return next();
//   } catch (error) {
//     return next(error);
//   }
// };

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
  // checkUserId,
};
