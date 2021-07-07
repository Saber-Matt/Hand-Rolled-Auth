import pool from '../utils/pool.js';

export default class Post {
  id;
  userId;
  photoUrl;
  caption;
  tags;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.photoUrl = row.photo_url;
    this.caption = row.caption;
    this.tags = row.tags;
  }
  static async insert({ userId, photoUrl, caption, tags }) {
    const { rows } = await pool.query(
      'INSERT INTO posts (user_id, photo_url, caption, tags) VALUES ($1, $2, $3, $4) RETURNING *', [userId, photoUrl, caption, tags]
    );

    return new Post(rows[0]);
  }

  static async findAll() {

    const { rows } = await pool.query(`
    SELECT *
    FROM posts
  `);
    return rows.map(post => new Post(post));
  }

  static async findById(id) {
    const { rows } = await pool.query(`
    SELECT *
    FROM posts
    LEFT JOIN users
    ON posts.user_id = users.id
    INNER JOIN comments
    ON comments.post = posts.id
    WHERE posts.id = $1`, [id]);
    console.log('pizza', rows);
    return rows.map(post => new Post(post));
  }
}
