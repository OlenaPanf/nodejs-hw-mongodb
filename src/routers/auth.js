import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserSchema,
  loginUserSchema,
  sendResetEmailSchema,
  resetPasswordSchema,
  loginWithGoogleOAuthSchema,
} from '../validation/authValidation.js';
import {
  registerUser,
  login,
  refresh,
  logout,
  sendResetEmailController,
  resetPasswordController,
  getGoogleOAuthUrlController,
  loginWithGoogleController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUser),
);

router.post('/login', validateBody(loginUserSchema), ctrlWrapper(login));

router.post('/refresh', ctrlWrapper(refresh));

router.post('/logout', ctrlWrapper(logout));

//запит на зміну паролю
router.post(
  '/send-reset-email',
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmailController),
);

//зміна паролю
router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

//отримання посилання авторизації
router.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

//підтвердження або створення
router.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);

export default router;
