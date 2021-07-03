DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  profile_photo_url TEXT NOT NULL
);
CREATE TABLE posts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) NOT NULL,
  photo_url TEXT NOT NULL,
  caption TEXT NOT NULL,
  tags TEXT [] NOT NULL
);
CREATE TABLE comments (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  comment_by BIGINT REFERENCES users(id) NOT NULL,
  post BIGINT REFERENCES posts(id) NOT NULL,
  comment TEXT NOT NULL
);
-- SELECT * posts(id)
--   LEFT JOIN user ON posts.id = user.id
--   INNER JOIN comments ON comments.user.id = posts.user_id
-- WHERE post = id