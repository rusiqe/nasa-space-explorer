import request from 'supertest';
import { app } from '../src/server';

describe('GET /api/nasa/epic', () => {
  it('should return EPIC Earth images', async () => {
    const res = await request(app).get('/api/nasa/epic');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should handle invalid date parameter', async () => {
    const res = await request(app).get('/api/nasa/epic?date=invalid-date');
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
    expect(res.body).toHaveProperty('success', false);
  });
}); 