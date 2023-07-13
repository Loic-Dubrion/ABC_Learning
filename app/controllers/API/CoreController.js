/** Class representing an abstract core controller. */
class CoreController {
  constructor(dataMapper) {
    this.dataMapper = dataMapper;
  }

  // Create
  async create(request, response, functionName) {
    const objData = request.body;
    const results = await this.dataMapper.executeFunction(functionName, objData);
    response.status(201).json(results);
  }

  // Read
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
    const results = await this.dataMapper.findOneByField(field, value);
    response.json(results);
  }

  // Update
  async update(request, response, functionName) {
    const { id } = request.params;
    console.log(id);
    const objData = request.body;
    console.log(objData);
    const results = await this.dataMapper.executeFunction(functionName, id, objData);
    response.status(201).json(results);
  }

  // Delete
  async delete(request, response) {
    const { id } = request.params;
    const results = await this.dataMapper.delete(id);
    response.json(results);
  }
}

module.exports = CoreController;
