import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth';
import Comment from '../models/Comment.js';

export default Router()
  .post('/', ensureAuth, (req, res, next) => {
    console.log('eat the cake', req.body);
    Comment.insert({ ...req.body, userId: req.user.id })
      .then(post => res.send(post))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Comment.delete(req.params.id)
      .then(comment => res.send(comment))
      .catch(next);
  });
