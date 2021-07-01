import pool from '../utils/pool;';
import jwt from 'jsonwebtoken';

export default class Post {
  user;
  photoUrl;
  caption;
  tags;

  constructor(row) {
    this.user = row.user;
    this.photoUrl = row.photoUrl;
    this.caption = row.caption;
    this.tags = row.tags;
  }
  static async insert({ user, photoUrl, caption, tags }) {
    console.log(user, photoUrl, caption, tags);
    const { rows } = await pool.query(
      'INSERT INTO posts (user, photo_url, caption, tags) VALUES ($1, $2, $3, $4) RETURNING *', [user, photoUrl, caption, tags]
    );

    return new Post(rows[0]);
  }
}
