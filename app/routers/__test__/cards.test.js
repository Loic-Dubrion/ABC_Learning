const request = require('supertest');
const app = require('../..'); // path to your app file

describe('GET /api/storyBoard/', () => {
  it('should respond with a list of storyboards', async () => {
    const response = await request(app)
      .get('/api/storyBoard/cards')
      .expect('Content-Type', /json/)
      .expect(200);

    // Check structure of the response body
    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach(item => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('activities');
      expect(item.activities).toBeInstanceOf(Array);
      expect(item).toHaveProperty('comments');
      expect(item).toHaveProperty('created_at');
      expect(item).toHaveProperty('updated_at');
    });

    // Check data of the first item in the response body
    expect(response.body[0]).toEqual({
      id: 1,
      name: "Acquisition",
      activities: [
        "Ecouter l'enseignant, suivre des cours, des conférences",
        "Consulter des documents, articles",
        "Lire des ressources numériques, multimédia, des sites web"
      ],
      comments: "Learning through acquisition is what learners are doing when they are listening to a lecture or podcast, reading from books or websites, and watching demos or videos",
      created_at: expect.any(String),
      updated_at: null
    });
  });
});
