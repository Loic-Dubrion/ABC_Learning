const { Error409, Error400 } = require('../../errors');

function controllerHandler(controller) {
  return async (request, response, next) => {
    try {
      await controller(request, response, next);
    } catch (err) {
      let newErr = err;
      if (err.code === '23505') {
        newErr = new Error409('Already exists');
      } else if (err.code === '23502') {
        newErr = new Error400('Cannot be null');
      }
      next(newErr);
    }
  };
}

module.exports = controllerHandler;
