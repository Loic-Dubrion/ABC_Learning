/** Class representing an abstract core controller. */
class CoreController {
  static dataMapper;

  async getAll(request, response) {
    const useView = request.query.useView === 'true';
    const results = await this.constructor.dataMapper.findAll(useView);
    response.json(results);
  }

  async getOne(request, response) {
    const { field, value } = request.query;
    const results = await this.constructor.dataMapper.findOneByField(field, value);
    response.json(results);
  }
}

module.exports = CoreController;
