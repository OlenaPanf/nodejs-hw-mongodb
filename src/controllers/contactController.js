import { getContacts, getContactById } from '../services/contacts.js';
import createHttpError from 'http-errors';

// Контролер для отримання всіх контактів
export const getAllContacts = async (req, res) => {
  const contacts = await getContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

// Контролер для отримання контакту за ID
export const getContactByIdHandler = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
