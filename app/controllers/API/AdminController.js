const CoreController = require('./CoreController');
const adminDataMapper = require('../../models/AdminDataMapper');

class AdminController extends CoreController {
  // static dataMapper = adminDataMapper;

  constructor() {
    super();
  }
}

module.exports = new AdminController();
