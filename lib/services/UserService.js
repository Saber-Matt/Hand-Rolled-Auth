import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export default class UserService {
  static async create({ username, password, profilePhotoUrl }) {
    //hash the password
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    //insert a user in the db with email, passwordHash
    return User.insert({ username, passwordHash, profilePhotoUrl });
  }

  static async authorize({ username, password }) {
    //check that the user exists (there is a user with email in the db)
    // User.findByEmail(email)
    const user = await User.findByEmail(username);

    //check that the users password matches the passwordHash
    const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordsMatch) {
      throw new Error('Invalid email/password');
    }

    return user;
  }
}
