import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';
import Comment from '../lib/models/Comment.js';
import Post from '../lib/models/Post.js';

describe('Comment routes', () => {

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

    await Post.insert({
      userId: user.id,
      photoUrl: 'https:placekeanu.com/200/150',
      caption: 'boom boom!',
      tags: ['tagA', 'tagB', 'tagC']
    });
  });
  it.only('create a new comment', async () => {

    const res = await agent
      .post('/api/v1/comments')
      .send({
        id: '1',
        commentBy: user.id,
        post1: 1,
        comment: ''
      });

    expect(res.body).toEqual({
      id: '1',
      commentBy: user.id,
      post: '1',
      comment: ''
    });
  });
});
