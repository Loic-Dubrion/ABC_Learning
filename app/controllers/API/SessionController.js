const CoreController = require('./CoreController');
const sessionDataMapper = require('../../models/SessionDataMapper');

class SessionController extends CoreController {
  constructor() {
    super(sessionDataMapper);
  }
}

module.exports = new SessionController();
