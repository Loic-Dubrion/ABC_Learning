const Error400 = require('../errors/Error400');

function validate(schema, dataSource) {
  return (request, response, next) => {
    const { error } = schema.validate(request[dataSource]);
    if (error) {
      next(new Error400(error.details[0].message));
    } else {
      next();
    }
  };
}

module.exports = validate;
