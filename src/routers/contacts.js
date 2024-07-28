import { Router } from 'express';
import {
  getAllContacts,
  getContactByIdHandler,
} from '../controllers/contactController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

// Роут для отримання всіх контактів
router.get('/', ctrlWrapper(getAllContacts));

// Роут для отримання контакту за ID
router.get('/:contactId', ctrlWrapper(getContactByIdHandler));

export default router;
