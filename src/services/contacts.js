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
