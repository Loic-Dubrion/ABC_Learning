const CoreController = require('./CoreController');
const sequenceDataMapper = require('../../models/SequenceDataMapper');

class SequenceController extends CoreController {
  constructor() {
    super(sequenceDataMapper);
  }

  // async getActivities(request, response) {
  //   const { cardId } = request.params;
  //   const results = await this.dataMapper.executeFunction('get_activities', cardId);
  //   response.json(results);
  // }
}

module.exports = new SequenceController();
