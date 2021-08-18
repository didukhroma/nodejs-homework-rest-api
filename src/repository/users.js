const { User } = require('../model');

class UsersRepository {
  constructor() {
    this.model = User;
  }

  async findById(id) {
    const result = await this.model.findById(id);
    return result;
  }

  async findByEmail(email) {
    const result = await this.model.findOne({ email });
    return result;
  }

  async findByVerifyToken(verifyToken) {
    return await User.findOne({ verifyToken });
  }

  async create(body) {
    // eslint-disable-next-line new-cap
    const user = new this.model(body);
    return user.save();
  }

  async updateToken(id, token) {
    await this.model.updateOne({ _id: id }, { token });
  }

  async findByIdAndUpdate(userId, body) {
    const result = await this.model.findByIdAndUpdate(
      { _id: userId },
      { ...body },
      { new: true },
    );
    return result;
  }
}

module.exports = UsersRepository;
