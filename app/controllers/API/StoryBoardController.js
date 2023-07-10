const CoreController = require('./CoreController');
const storyBoardDataMapper = require('../../models/StoryBoardDataMapper');

class StoryBoardController extends CoreController {
  constructor() {
    super(storyBoardDataMapper);
  }
}

module.exports = new StoryBoardController();
