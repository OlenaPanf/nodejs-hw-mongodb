import express from 'express';
import { getAllContacts } from '../controllers/contactController.js';

const router = express.Router();

// Роут для отримання всіх контактів
router.get('/contacts', getAllContacts);

export default router;
