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
    const excelStream = await convert.jsonToExcel(results);

    response.setHeader('Content-Disposition', 'attachment; filename=sequenceData.xlsx');
    response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    excelStream.pipe(response);
  }

  async convertPdf(request, response) {
    const { id, userId } = request.params;
    const results = await this.dataMapper.executeFunction('get_sequence_detail', id, userId);
    const pdf = await convert.jsonToPdf(results);

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
    pdf.pipe(response);
  }
}

module.exports = new SequenceController();
