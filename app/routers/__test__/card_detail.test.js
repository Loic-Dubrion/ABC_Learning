const request = require('supertest');
const app = require('../..'); // path to your app file

describe('GET /api/storyBoard/cards/1', () => {
  it('should respond with the details of a card', async () => {
    const response = await request(app)
      .get('/api/storyBoard/cards/1')
      .expect('Content-Type', /json/)
      .expect(200);

    // Check structure of the response body
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty('get_activities');
    expect(response.body[0].get_activities).toHaveProperty('card_id', 1);
    expect(response.body[0].get_activities).toHaveProperty('card_name', 'Acquisition');
    expect(response.body[0].get_activities).toHaveProperty('activities');
    expect(response.body[0].get_activities.activities).toBeInstanceOf(Array);
    expect(response.body[0].get_activities).toHaveProperty('tool_categories');
    expect(response.body[0].get_activities.tool_categories).toBeInstanceOf(Array);

    // Check data of the first tool category
    const toolCategory = response.body[0].get_activities.tool_categories[0];
    expect(toolCategory).toHaveProperty('tool_category_id');
    expect(toolCategory).toHaveProperty('tool_category_name');
    expect(toolCategory).toHaveProperty('tools');
    toolCategory.tools.forEach(tool => {
      expect(tool).toHaveProperty('tool_id');
      expect(tool).toHaveProperty('tool_name');
      expect(tool).toHaveProperty('level_id');
      expect(tool).toHaveProperty('level_name');
    });
  });
});
