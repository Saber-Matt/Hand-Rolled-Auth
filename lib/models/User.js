import pool from '../utils/pool';

export default class User {
  username;
  passwordHash;
  profilePhotoUrl;

  constructor(row) {
    this.username = row.username;
    this.passwordHash = row.password_hash;
    this.profilePhotoUrl = row.profile_photo_url;
  }

  static async insert({ username, passwordHash, profilePhotoUrl }) {
    const { rows } = await pool.query(
      'INSERT INTO users (username, password_hash, profile_photo_url) VALUES ($1, $2, $3) RETURNING *', [username, passwordHash, profilePhotoUrl]
    );

    return new User(rows[0]);
  }
}
