import express from 'express';
import {
  getAllContacts,
  getContactByIdHandler,
} from '../controllers/contactController.js';
const router = express.Router();

// Роут для отримання всіх контактів
router.get('/contacts', getAllContacts);

// Роут для отримання контакту за ID
router.get('/contacts/:contactId', getContactByIdHandler);

export default router;
