const CoreDataMapper = require('./CoreDataMapper');

class SequenceDataMapper extends CoreDataMapper {
  static get tableName() {
    return 'tool';
  }
}

module.exports = new SequenceDataMapper();
