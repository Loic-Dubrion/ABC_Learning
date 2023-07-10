const CoreController = require('./CoreController');
const storyBoardDataMapper = require('../../models/StoryBoardDataMapper');

class StoryBoardController extends CoreController {
  constructor() {
    super(storyBoardDataMapper);
  }

  async getActivities(request, response) {
    const { cardId } = request.params;
    const results = await this.dataMapper.executeFunction('get_activities', cardId);
    response.json(results);
  }
}

module.exports = new StoryBoardController();
