import request from 'supertest';
import { app } from '../src';

describe('API Endpoints', () => {
  test('GET /topics', async () => {
    const response = await request(app).get('/topics');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});
