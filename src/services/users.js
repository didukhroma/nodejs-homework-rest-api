const { UsersRepository } = require('../repository');

class UserService {
  constructor() {
    this.repositories = {
      users: new UsersRepository(),
    };
  }

  async create(body) {
    const data = await this.repositories.users.create(body);
    return data;
  }

  async findByEmail(email) {
    const data = await this.repositories.users.findByEmail(email);
    return data;
  }

  async findById(id) {
    const data = await this.repositories.users.findById(id);
    return data;
  }

  async findByIdAndUpdate(userId, body) {
    const data = await this.repositories.users.findByIdAndUpdate(userId, body);
    return data;
  }

  async updateAvatar(userId, avatarUrl) {
    const data = await this.repositories.users.updateAvatar(userId, avatarUrl);
    return data;
  }

  async verify({ verificationToken }) {
    const user = await this.repositories.users.findByVerifyToken(
      verificationToken,
    );
    if (user) {
      await user.updateOne({ verify: true, verifyToken: null });
      return true;
    }
    return false;
  }
}

module.exports = new UserService();
