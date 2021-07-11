const { model } = require('mongoose');
const { contactsSchema } = require('./schemas/contacts');

const Contact = model('contact', contactsSchema);

module.exports = Contact;
