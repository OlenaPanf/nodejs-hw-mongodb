import { getContacts, getContactById } from '../services/contacts.js';

// Контролер для отримання всіх контактів
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await getContacts();
    res.status(200).json({
      status: 'success',
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch contacts',
      error: error.message,
    });
  }
};

// Контролер для отримання контакту за ID
export const getContactByIdHandler = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (contact) {
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } else {
      res.status(404).json({
        message: 'Contact not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch contact',
      error: error.message,
    });
  }
};
