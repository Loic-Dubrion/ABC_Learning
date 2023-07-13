const CoreController = require('./CoreController');
const sequenceDataMapper = require('../../models/SequenceDataMapper');

class SequenceController extends CoreController {
  constructor() {
    super(sequenceDataMapper);
  }

  async getDetailSequence(request, response) {
    const { id } = request.params;
    const results = await this.dataMapper.executeFunction('get_sequence_detail', id);
    response.json(results);
  }
}

module.exports = new SequenceController();
