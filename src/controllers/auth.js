import {
  registerNewUser,
  loginUser,
  refreshUser,
  logoutUser,
  sendResetToken,
  resetPassword,
} from '../services/auth.js';
import { THIRTY_DAYS } from '../constants/index.js';

//====================рестрація====================================
export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Реєструю нового користувача
  const newUser = await registerNewUser({ name, email, password });

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    },
  });
};

//====================логін====================================
export const login = async (req, res) => {
  const { email, password } = req.body;

  const session = await loginUser({ email, password });

  // логіка для створення та встановлення токенів
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS), //expires: session.refreshTokenValidUntil,
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS), //expires: session.refreshTokenValidUntil,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

//====================рефреш====================================
export const refresh = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;

  const session = await refreshUser({ refreshToken, sessionId });

  // логіка для створення та встановлення нових токенів
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

//====================логаут====================================
export const logout = async (req, res) => {
  // Викликаємо сервіс для видалення сесії
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  // Видаляємо cookies
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  // Відповідь без тіла і статусом 204
  res.status(204).end();
};

//====================запит на скидання паролю===================
export const sendResetEmailController = async (req, res) => {
  await sendResetToken(req.body.email);
  res.json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

//====================зміна паролю====================================
export const resetPasswordController = async (req, res) => {
  const { token, password } = req.body;

  await resetPassword({ token, password });

  res.status(200).json({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
};
