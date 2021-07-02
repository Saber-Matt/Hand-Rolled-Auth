import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth';
import Comment from '../models/Comment.js';

export default Router()
  .post('/comments', ensureAuth, (req, res, next) => {
    Comment.insert({ ...req.body, userId: req.user.id })
      .then(post => res.send(post))
      .catch(next);
  });
