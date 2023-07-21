const expressSwagger = require('express-jsdoc-swagger');
const logger = require('./logger');

const swaggerOptions = {
  servers: [
    {
      url: `http://${process.env.PGHOST}:${process.env.PORT}/api/` || 'http://localhost:3000/api/',
    },
  ],
  info: {
    version: '1.0',
    title: 'ABC Learning API',
    description: 'API for ABC_learning project',
  },
  baseDir: `${__dirname}/app`,
  filesPattern: './**/*.js',
  swaggerUIPath: '/api-docs',
  exposeSwaggerUI: true,
};

function injectSwagger(app, baseDir) {
  logger.info('swagger UI injected');
  swaggerOptions.baseDir = baseDir;
  expressSwagger(app)(swaggerOptions);
}

module.exports = injectSwagger;
