import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new user via POST', async () => {

    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'test',
        password: 'password',
        profilePhotoUrl: 'string'
      });

    expect(res.body).toEqual({
      id: '1',
      username: 'test',
      profilePhotoUrl: 'string'
    });
  });


});
