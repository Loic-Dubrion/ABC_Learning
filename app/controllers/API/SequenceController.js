const CoreController = require('./CoreController');
const sequenceDataMapper = require('../../models/SequenceDataMapper');
const convert = require('../services/convert');

class SequenceController extends CoreController {
  constructor() {
    super(sequenceDataMapper);
  }

  async getDetailSequence(request, response) {
    const { id, userId } = request.params;
    const results = await this.dataMapper.executeFunction('get_sequence_detail', id, userId);
    response.json(results);
  }

  async convertExcel(request, response) {
    const { id, userId } = request.params;
    const results = await this.dataMapper.executeFunction('get_sequence_detail', id, userId);
    console.log("Avant la conversion")
    const excelStream = await convert.jsonToExcel(results);
    console.log("après la conversion")

    response.setHeader('Content-Disposition', 'attachment; filename=sequenceData.xlsx');
    response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    console.log("TEST EXCEL : ", excelStream);
    excelStream.pipe(response);
  }
}

module.exports = new SequenceController();
