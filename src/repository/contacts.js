const { ObjectID } = require('mongodb');
const { HttpCode } = require('../helpers/constants');
const { ErrorHandler } = require('../helpers/errorHandler');

class ContactsRepository {
  constructor(client) {
    this.collection = client.db('db-contacts').collection('contacts');
    // console.log(client.db().stats());
  }

  #getMongoId(id) {
    try {
      return ObjectID(id);
    } catch (error) {
      throw new ErrorHandler(
        HttpCode.BAD_REQUEST,
        `MongoDb _id:${error.message}`,
        'Bad Request',
      );
    }
  }

  async getAll() {
    const results = await this.collection.find({}).toArray();
    return results;
  }

  async getById(id) {
    const contactsId = this.getMongoId(id);
    const [result] = await this.collection.find({ _id: contactsId }).toArray();
    return result;
  }

  async create(body) {
    const {
      ops: [result],
    } = await this.collection.insertOne(body);
    return result;
  }

  async update(id, body) {
    const contactsId = this.getMongoId(id);
    const { value: result } = await this.collection.findOneAndUpdate(
      { _id: contactsId },
      { $set: body },
      { returnOriginal: false },
    );
    return result;
  }

  async remove(id) {
    const contactsId = this.getMongoId(id);
    const { value: result } = await this.collection.findOneAndDelete({
      _id: contactsId,
    });
    return result;
  }
}

module.exports = ContactsRepository;
