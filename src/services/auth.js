const { UsersRepository } = require('../repository');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  constructor() {
    this.repositories = {
      users: new UsersRepository(),
    };
  }

  async login({ email, password }) {
    const user = await this.repositories.users.findByEmail(email);
    if (!user || !user.validPassword(password)) return null;

    const payload = { id: user._id };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    // console.log(token);
    await this.repositories.users.updateToken(payload.id, token);
    const data = await this.repositories.users.findById(payload.id);
    const result = {
      token: data.token,
      user: { email: data.email, subscription: data.subscription },
    };
    return result;
  }

  async logout(id) {
    const isPresent = await this.repositories.users.findById(id);
    console.log(isPresent);
    const data = await this.repositories.users.updateToken(id, null);
    return data;
  }
}

module.exports = new AuthService();
