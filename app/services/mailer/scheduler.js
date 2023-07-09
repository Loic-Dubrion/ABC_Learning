const cron = require('node-cron');
const dumpDatabase = require('../secureDB/pg_dump');
const sendEmail = require('./sender');

const scheduleTasks = () => {
  cron.schedule('0 0 * * *', dumpDatabase);
};

module.exports = scheduleTasks;
