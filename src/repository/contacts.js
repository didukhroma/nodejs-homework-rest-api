const { Contact } = require('../model');

class ContactsRepository {
  constructor() {
    this.model = Contact;
  }

  async getAll(userId, { page = 1, limit = 10, favorite }) {
    const filter = typeof favorite === 'undefined' ? null : { favorite };

    const result = await this.model.paginate(
      { owner: userId, ...filter },
      { limit, page, select: '-owner -createdAt -updatedAt ' },
    );
    return result;
  }

  async getById(userId, id) {
    const result = await this.model
      .findOne({ _id: id, owner: userId })
      .populate({
        path: 'owner',
        select: 'email -_id',
      });
    return result;
  }

  async create(userId, body) {
    const isPresent = await this.model.findOne({
      name: body.name,
      owner: userId,
    });
    if (isPresent) return null;
    const result = await this.model.create({ ...body, owner: userId });
    return result;
  }

  async update(userId, id, body) {
    const result = await this.model.findByIdAndUpdate(
      { _id: id, owner: userId },
      { ...body },
      { new: true },
    );

    return result;
  }

  async updateStatus(userId, id, body) {
    const result = await this.model.findByIdAndUpdate(
      { _id: id, owner: userId },
      { ...body },
      { new: true },
    );

    return result;
  }

  async remove(userId, id) {
    const result = await this.model.findByIdAndDelete({
      _id: id,
      owner: userId,
    });
    return result;
  }
}

module.exports = ContactsRepository;
