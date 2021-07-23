const { model } = require('mongoose');

const { contactsSchema } = require('./schemas/contacts');
const { userSchema } = require('./schemas/users');

const Contact = model('contact', contactsSchema);
const User = model('user', userSchema);

module.exports = { Contact, User };
