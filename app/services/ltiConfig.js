require('dotenv').config();
const LTI = require('ltijs').Provider;
const bunyan = require('bunyan');

const setupLTI = () => {
  const connectionString = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

  LTI.setup('LTIKEY', {
    url: connectionString,
    options: {
      client: 'pg'
    }
  });

  LTI.onConnect((connection, request, response) => {
    logger.info("Connexion LTI réussie pour :", connection.userInfo);
    return lti.redirect(response, 'http://localhost:3000/api/');
});

  return LTI;
};

module.exports = setupLTI;
