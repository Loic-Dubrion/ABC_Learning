const CoreDataMapper = require('./CoreDataMapper');

class SequenceDataMapper extends CoreDataMapper {
  static tableName = 'sequence'; 

  constructor() {
    super();
  }
}

module.exports = new SequenceDataMapper();
