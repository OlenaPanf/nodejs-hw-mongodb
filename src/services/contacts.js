import Contact from '../models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getPaginatedContacts = async (query) => {
  try {
    // Парсимо параметри пагінації
    const { page, perPage } = parsePaginationParams(query);
    const skip = (page - 1) * perPage;

    // Отримуємо контакти та загальну кількість контактів паралельно
    const [contacts, totalItems] = await Promise.all([
      Contact.find({}).skip(skip).limit(perPage).exec(),
      Contact.countDocuments({}), // Загальну кількість контактів
    ]);

    // Розраховуємо дані пагінації
    const paginationData = calculatePaginationData(totalItems, perPage, page);

    return {
      contacts,
      ...paginationData,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

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

export const updateContactById = async (contactId, contactData) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      contactData,
      { new: true },
    );
    return updatedContact;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteContactById = async (contactId) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    return deletedContact;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
