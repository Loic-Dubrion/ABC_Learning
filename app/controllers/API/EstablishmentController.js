const CoreController = require('./CoreController');
const EstablishmentDataMapper = require('../../models/EstablishmentDataMapper');

class EstablishmentController extends CoreController {
  constructor() {
    super(EstablishmentDataMapper);
  }
}

module.exports = new EstablishmentController();
