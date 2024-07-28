import { Router } from 'express';
import {
  getAllContacts,
  getContactByIdHandler,
} from '../controllers/contactController.js';

const router = Router();

// Роут для отримання всіх контактів
router.get('/', getAllContacts);

// Роут для отримання контакту за ID
router.get('/:contactId', getContactByIdHandler);

export default router;
