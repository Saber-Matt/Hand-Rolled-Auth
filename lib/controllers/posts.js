import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth';
import Post from '../models/Post.js';

export default Router()
  .post('/', ensureAuth, (req, res, next) => {
    Post.create({ ...req.body, userId: req.user.id })
      .then(post => res.send(post))
      .catch(next);
  })

  .get('/', ensureAuth, (req, res, next) => {
    Post.findAll()
      .then(posts => res.send(posts))
      .catch(next);
  });
