import Contact from '../models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getPaginatedContacts = async (
  query,
  { sortBy, sortOrder },
  userId,
) => {
  try {
    // Парсинг параметрів пагінації
    const { page, perPage } = parsePaginationParams(query);
    const skip = (page - 1) * perPage;
    // Парсинг параметрів фільтрації
    const { type, isFavourite } = parseFilterParams(query);

    // Створення об'єкта фільтру
    const filter = { userId };
    if (type) filter.contactType = type;
    if (isFavourite !== null) filter.isFavourite = isFavourite;

    // Отримую контакти та загальну кількість контактів паралельно
    const [contacts, totalItems] = await Promise.all([
      Contact.find(filter)
        .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
        .skip(skip)
        .limit(perPage)
        .exec(),
      Contact.countDocuments(filter),
    ]);

    // Розраховую дані пагінації
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

export const getContacts = async (userId) => {
  try {
    const contacts = await Contact.find({ userId });
    return contacts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getContactById = async (contactId, userId) => {
  try {
    const contact = await Contact.findOne({ _id: contactId, userId });
    return contact;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addContact = async (contactData, userId) => {
  try {
    const newContact = new Contact({
      ...contactData,
      userId, // Додаю userId, передане з контролера
    });
    await newContact.save();
    return newContact;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateContactById = async (contactId, contactData, userId) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId, userId },
      contactData,
      { new: true },
    );
    return updatedContact;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteContactById = async (contactId, userId) => {
  try {
    const deletedContact = await Contact.findOneAndDelete({
      _id: contactId,
      userId,
    });
    return deletedContact;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
