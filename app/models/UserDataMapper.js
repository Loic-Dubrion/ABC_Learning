const CoreDataMapper = require('./CoreDataMapper');

/** Class representing a user data mapper. */
class UserDataMapper extends CoreDataMapper {
  static get tableName() {
    return 'user';
  }
}

module.exports = new UserDataMapper();
