import request from 'supertest';
import { app } from '../src/server';

describe('GET /api/nasa/apod', () => {
  it('should return Astronomy Picture of the Day data', async () => {
    const res = await request(app).get('/api/nasa/apod');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('date');
    expect(res.body.data).toHaveProperty('title');
  });

  it('should handle invalid date parameter', async () => {
    const res = await request(app).get('/api/nasa/apod?date=invalid-date');
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
    expect(res.body).toHaveProperty('success', false);
  });
}); 