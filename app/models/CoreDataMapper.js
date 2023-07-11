// eslint-disable-next-line import/no-extraneous-dependencies
const memoizee = require('memoizee');
const client = require('../services/clientDB/clientPostgres');

class CoreDataMapper {
  constructor() {
    this.findAll = memoizee(this.findAll.bind(this), { promise: true, maxAge: 10 });
  }

  async findAll(useView) {
    const tableName = useView ? this.constructor.viewName : this.constructor.tableName;
    const preparedQuery = {
      text: `SELECT * FROM "${tableName}"`,
    };
    const results = await client.query(preparedQuery);
    return results.rows;
  }

  async findByPk(id) {
    const { tableName } = this.constructor;
    const preparedQuery = {
      text: `SELECT * FROM "${tableName}" WHERE id=$1`,
      values: [id],
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }

  async findOneByField(field, value) {
    const { tableName } = this.constructor;
    const query = {
      text: `SELECT * FROM "${tableName}" WHERE ${field} = $1`,
      values: [value],
    };
    const results = await client.query(query);
    return results.rows[0];
  }

  // eslint-disable-next-line class-methods-use-this
  async executeFunction(functionName, ...params) {
    const preparedQuery = {
      text: `SELECT * FROM ${functionName}(${params.map((_, i) => `$${i + 1}`).join(', ')})`,
      values: params,
    };
    const results = await client.query(preparedQuery);
    return results.rows;
  }
}

module.exports = CoreDataMapper;
