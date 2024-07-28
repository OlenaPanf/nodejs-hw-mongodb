import Contact from '../models/contact.js';

export const getContacts = async () => {
  try {
    const contacts = await Contact.find({});
    return contacts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addContact = async (contactData) => {
  try {
    const newContact = new Contact(contactData);
    await newContact.save();
    return newContact;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
