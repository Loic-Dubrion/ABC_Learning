const CoreDataMapper = require('./CoreDataMapper');

class StoryBoardDataMapper extends CoreDataMapper {
  static tableName = 'card'; 

  constructor() {
    super();
  }
}

module.exports = new StoryBoardDataMapper();
