import request from 'supertest';
import { app } from '../src/server';

describe('GET /api/nasa/neo', () => {
  it('should return NEO data for a valid date range', async () => {
    const res = await request(app).get('/api/nasa/neo?start_date=2023-01-01&end_date=2023-01-07');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('near_earth_objects');
  });

  it('should handle invalid date range', async () => {
    const res = await request(app).get('/api/nasa/neo?start_date=invalid&end_date=invalid');
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
    expect(res.body).toHaveProperty('success', false);
  });
}); 