/** Class representing an abstract core controller. */
class CoreController {
  constructor(dataMapper) {
    this.dataMapper = dataMapper;
  }

  async getAll(request, response) {
    const { useView } = request.query;
    const results = await this.dataMapper.findAll(useView);
    response.json(results);
  }

  async getOneByPk(request, response) {
    const { id } = request.params;
    const results = await this.dataMapper.findByPk(id);
    response.json(results);
  }

  async getOneByField(request, response) {
    const { field, value } = request.query;
    const results = await this.constructor.dataMapper.findOneByField(field, value);
    response.json(results);
  }
}

module.exports = CoreController;
