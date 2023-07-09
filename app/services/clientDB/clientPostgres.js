require('dotenv').config();

const { Pool } = require('pg');
const logger = require('../logger');

client.connect((err) => {
  if (err) {
    logger.error(`Database connection error: ${err.stack}`);
  } else {
    logger.info('Database connection successful 🎉');
  }
});

module.exports = client;
