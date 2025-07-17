import request from 'supertest';
import { app } from '../src/server';

describe('GET /api/nasa/mars-rovers/:rover/photos', () => {
  it('should return photos for Curiosity rover', async () => {
    const res = await request(app).get('/api/nasa/mars-rovers/curiosity/photos?sol=1000');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('photos');
    expect(Array.isArray(res.body.data.photos)).toBe(true);
  });

  it('should handle invalid rover name', async () => {
    const res = await request(app).get('/api/nasa/mars-rovers/invalid/photos');
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
    expect(res.body).toHaveProperty('success', false);
  });
}); 