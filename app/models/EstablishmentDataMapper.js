const CoreDataMapper = require('./CoreDataMapper');

class SequenceDataMapper extends CoreDataMapper {
  static get tableName() {
    return 'establishment';
  }
}

module.exports = new SequenceDataMapper();
