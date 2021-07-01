import pool from '../utils/pool.js';
import jwt from 'jsonwebtoken';

export default class Post {
  userId;
  photoUrl;
  caption;
  tags;

  constructor(row) {
    this.userId = row.user_id;
    this.photoUrl = row.photoUrl;
    this.caption = row.caption;
    this.tags = row.tags;
  }
  static async insert({ userId, photoUrl, caption, tags }) {
    console.log(userId, photoUrl, caption, tags);
    const { rows } = await pool.query(
      'INSERT INTO posts (user_id, photo_url, caption, tags) VALUES ($1, $2, $3, $4) RETURNING *', [userId, photoUrl, caption, tags]
    );

    return new Post(rows[0]);
  }
}
