import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import cookieParser from 'cookie-parser';
import authController from '../lib/controllers/auth.js';
import postController from './/controllers/posts.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(notFoundMiddleware);
app.use(errorMiddleware);
app.use(authController);
if (app) {
  console.log('hi');
}
app.use(authController);
app.use('/api/v1/posts', postController);


export default app;
