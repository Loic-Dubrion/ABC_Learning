const CoreController = require('./CoreController');
const ToolDataMapper = require('../../models/ToolDataMapper');

class ToolController extends CoreController {
  constructor() {
    super(ToolDataMapper);
  }
}

module.exports = new ToolController();
