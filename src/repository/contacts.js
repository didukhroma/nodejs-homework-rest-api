const Contact = require('../model');

class ContactsRepository {
  constructor() {
    this.model = Contact;
  }

  async getAll() {
    const results = await this.model.find({});
    return results;
  }

  async getById(id) {
    const result = await this.model.findOne({ _id: id });
    return result;
  }

  async create(body) {
    const result = await this.model.create(body);
    return result;
  }

  async update(id, body) {
    const result = await this.model.findByIdAndUpdate(
      { _id: id },
      { ...body },
      { new: true },
    );

    return result;
  }

  async updateStatus(id, body) {
    const result = await this.model.findByIdAndUpdate(
      { _id: id },
      { ...body },
      { new: true },
    );

    return result;
  }

  async remove(id) {
    const result = await this.model.findByIdAndDelete({
      _id: id,
    });
    return result;
  }
}

module.exports = ContactsRepository;
