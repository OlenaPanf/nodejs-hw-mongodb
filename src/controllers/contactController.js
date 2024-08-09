import {
  getPaginatedContacts,
  //getContacts,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parseSortParams } from '../utils/parseSortParams.js';

// Контролер для отримання всіх контактів з пагінацією
export const getAllContacts = async (req, res) => {
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const userId = req.user._id; // отримання userId з req.user
  const {
    contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  } = await getPaginatedContacts(req.query, { sortBy, sortOrder }, userId);

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data: contacts,
      page,
      perPage,
      totalItems,
      totalPages,
      hasPreviousPage,
      hasNextPage,
    },
  });
};

// Контролер для отримання контакту за ID
export const getContactByIdHandler = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id; // отримання userId з req.user
  const contact = await getContactById(contactId, userId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

// Контролер для створення нового контакту
export const createContact = async (req, res, next) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;
  const userId = req.user._id; // отримання userId з req.user

  if (!name || !phoneNumber || !contactType) {
    throw createHttpError(
      400,
      'Name, phoneNumber and contactType are required',
    );
  }

  const newContact = await addContact({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
    userId, // додавання userId
  });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

// Контролер для оновлення даних існуючого контакту
export const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;
  const userId = req.user._id; // отримання userId з req.user

  const updatedContact = await updateContactById(
    contactId,
    {
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    },
    userId,
  );

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

// Контролер для видалення контакту за ID
export const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id; // отримання userId з req.user

  const deletedContact = await deleteContactById(contactId, userId);

  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
