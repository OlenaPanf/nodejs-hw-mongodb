import User from '../models/user.js';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/index.js';
import Session from '../models/session.js';
import { randomBytes } from 'crypto';

export const registerNewUser = async ({ name, email, password }) => {
  // Перевірка, чи користувач із такою поштою вже існує
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  // Хешування пароля
  const hashedPassword = await bcrypt.hash(password, 10);

  // Створення нового користувача
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  // Видалення пароля з об'єкта користувача перед поверненням
  //newUser.password = undefined;

  return newUser.toJSON();
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const isEqual = await bcrypt.compare(password, user.password); // Порівнюємо хеші паролів

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  // токени
  await Session.deleteOne({ userId: user._id }); //видаляю стару сесію

  const accessToken = randomBytes(30).toString('base64'); //створюю нові токени
  const refreshToken = randomBytes(30).toString('base64'); //створюю нові токени

  //створюю нову сесію
  const session = await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });

  return session;
};