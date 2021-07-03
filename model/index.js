const { v4: id } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  const result = JSON.parse(data);
  return result;
};

const getContactById = async contactId => {
  const data = await listContacts();
  const result = data.find(item => item.id === contactId);
  return result;
};

const addContact = async body => {
  const data = await listContacts();

  const isContactPresentInDatabase = !!data.find(
    item => item.name === body.name,
  );

  if (isContactPresentInDatabase) {
    return;
  }

  const newContact = { ...body, id: id() };
  const result = [...data, newContact];

  try {
    fs.writeFile(contactsPath, `${JSON.stringify(result)}`, err => {
      throw err;
    });
  } catch (error) {
    console.log(error);
  }

  return newContact;
};

const removeContact = async contactId => {
  const data = await listContacts();
  const isContactPresentInDatabase = !!data.find(item => item.id === contactId);
  if (!isContactPresentInDatabase) {
    console.log('present');
    return false;
  }

  const result = data.filter(item => item.id !== contactId);

  try {
    fs.writeFile(contactsPath, `${JSON.stringify(result)}`, err => {
      throw err;
    });
  } catch (error) {
    console.log(error);
  }
  return true;
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const contactIndex = data.findIndex(contact => contact.id === contactId);
  data[contactIndex] = { ...data[contactIndex], ...body };
  try {
    fs.writeFile(contactsPath, `${JSON.stringify(data)}`, err => {
      throw err;
    });
  } catch (error) {
    console.log(error);
  }
  return data[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
