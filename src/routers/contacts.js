import { Router } from 'express';
import {
  getAllContacts,
  getContactByIdHandler,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contactController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

// Роут для отримання всіх контактів
router.get('/', ctrlWrapper(getAllContacts));

// Роут для отримання контакту за ID
router.get('/:contactId', ctrlWrapper(getContactByIdHandler));

// Роут для створення нового контакту
router.post('/', ctrlWrapper(createContact));

// Роут для оновлення контакту за ID
router.patch('/:contactId', ctrlWrapper(updateContact));

// Роут для видалення контакту за ID
router.delete('/:contactId', ctrlWrapper(deleteContact));

export default router;
