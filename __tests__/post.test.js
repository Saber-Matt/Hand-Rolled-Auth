import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';
import Post from '../lib/models/Post.js';

describe('POST routes', () => {

  let user = {};
  let agent;
  beforeEach(async () => {
    await setup(pool);
    agent = request.agent(app);

    user = await UserService.create({
      username: 'test',
      password: 'password',
      profilePhotoUrl: 'string'
    });
    await agent
      .post('/api/v1/auth/login')
      .send({
        username: 'test',
        password: 'password',
      });
  });
  it('create a new post', async () => {
    const res = await agent
      .post('/api/v1/posts')
      .send({
        userId: user.id,
        photoUrl: 'https://placekeanu.com/200/150',
        caption: '',
        tags: ['tagA,', 'tagB'],
      });

    expect(res.body).toEqual({
      id: '1',
      userId: user.id,
      photoUrl: 'https://placekeanu.com/200/150',
      caption: '',
      tags: ['tagA,', 'tagB'],
    });
  });
  it('gets all posts', async () => {
    const post1 = await Post.insert({
      userId: user.id,
      photoUrl: 'https:placekeanu.com/200/150',
      caption: 'here he is',
      tags: ['tagA', 'tagB', 'tagC']
    });

    const post2 = await Post.insert({
      userId: user.id,
      photoUrl: 'https:placekeanu.com/200/150',
      caption: 'boom boom!',
      tags: ['tagA', 'tagB', 'tagC']
    });

    const res = await agent
      .get('/api/v1/posts');

    expect(res.body).toEqual([post1, post2]);
  });

  it('gets posts by id', async () => {
    const postById = await Post.insert({
      userId: user.id,
      photoUrl: 'https:placekeanu.com/200/150',
      caption: 'boom boom!',
      tags: ['tagA', 'tagB', 'tagC']
    });
    const res = await agent
      .get('/api/v1/posts/1');

    expect(res.body).toEqual(postById);
  });
});
