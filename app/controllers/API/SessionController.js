const CoreController = require('./CoreController');
const sessionDataMapper = require('../../models/SessionDataMapper');

class SessionController extends CoreController {
  constructor() {
    super(sessionDataMapper);
  }

  async createSession(request, response) {
    const { ...objData } = request.body;
    const results = await this.dataMapper.executeFunction('create_session', objData);
    response.status(201).json(results);
  }
}

module.exports = new SessionController();
