import pool from '../utils/pool.js';

export default class Comment {
  id;
  commentBy;
  post;
  comment;

  constructor(row) {
    this.id = row.id;
    this.commentBy = row.comment_by;
    this.post = row.post;
    this.comment = row.comment;
  }
  static async insert({ commentBy,
    post1, comment }) {
    console.log('add ice cream', post1);
    const { rows } = await pool.query(
      'INSERT INTO comments (comment_by, post, comment) VALUES ($1, $2, $3) RETURNING * ', [commentBy, post1, comment]
    );
    console.log('grab a napkin', rows[0]);
    return new Comment(rows[0]);
  }

  static async findAll() {

    const { rows } = await pool.query(`
    SELECT *
    FROM comments
  `);
    return rows.map(comment => new Comment(comment));
  }
}
