import { Router } from 'express';
import {
  getAllContacts,
  getContactByIdHandler,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contactController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contactValidation.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

// Роут для отримання всіх контактів
router.get('/', ctrlWrapper(getAllContacts));

// Роут для отримання контакту за ID
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdHandler));

// Роут для створення нового контакту
router.post('/', validateBody(createContactSchema), ctrlWrapper(createContact));

// Роут для оновлення контакту за ID
router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContact),
);

// Роут для видалення контакту за ID
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContact));

export default router;
