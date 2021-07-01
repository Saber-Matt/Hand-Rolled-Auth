import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/userService.js';

describe('demo routes', () => {
  beforeEach(() => {

    return setup(pool);
  });

  it('creates a new user via POST', async () => {

    // const agent = request.agent(app);
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

  it('logs in an existing user via POST', async () => {

    await request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'test',
        password: 'password',
        profilePhotoUrl: 'string'
      });

    const agent = request.agent(app);
    const res = await agent
      .post('/api/v1/auth/login')
      .send({
        username: 'test',
        password: 'password',
      });

    expect(res.body).toEqual({
      id: '1',
      username: 'test',
      profilePhotoUrl: 'string'
    });
  });
}
);
