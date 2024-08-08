import { Router } from 'express';
import contactsRouter from './contacts.js';
import authRouter from './auth.js';

const router = Router();

// Підключаємо роут для контактів
router.use('/contacts', contactsRouter);

// Підключаємо роут для авторизації
router.use('/auth', authRouter);

export default router;
