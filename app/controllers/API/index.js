const adminController = require('./AdminController');
const userController = require('./UserController');
const jwtController = require('./JwtController');

const apiController = {
  getHome(request, response) {
    const fullURL = `${request.protocol}://${request.get('host')}${process.env.API_DOCUMENTATION_ROUTE ?? '/docs'}`;
    response.redirect(fullURL);
  },
};

module.exports = {
  apiController,
  adminController,
  userController,
  jwtController,
};
