const CoreController = require('./CoreController');
const sequenceDataMapper = require('../../models/SequenceDataMapper');

class SequenceController extends CoreController {
  constructor() {
    super(sequenceDataMapper);
  }

  async getDetailSequence(request, response) {
    const { id, userId } = request.params;
    const results = await this.dataMapper.executeFunction('get_sequence_detail', id, userId);
    response.json(results);
  }
}

module.exports = new SequenceController();
