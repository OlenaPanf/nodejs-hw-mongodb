import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserSchema,
  loginUserSchema,
} from '../validation/authValidation.js';
import {
  registerUser,
  login,
  refreshSession,
  logout,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUser),
);

router.post('/login', validateBody(loginUserSchema), ctrlWrapper(login));

router.post('/refresh', ctrlWrapper(refreshSession));

router.post('/logout', ctrlWrapper(logout));

export default router;
