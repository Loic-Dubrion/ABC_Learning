const CoreDataMapper = require('./CoreDataMapper');

class SessionDataMapper extends CoreDataMapper {
  static tableName = 'session'; 

  constructor() {
    super();
  }
}

module.exports = new SessionDataMapper();
