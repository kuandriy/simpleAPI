const app = require('../server.js');
const supertest = require('supertest');
const request = supertest(app);

it('gets the test endpoint', async done => {
  const response = await request.get('/projects');
  expect(response.status).toBe(200);
  done();
})