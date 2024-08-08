import User from '../models/user.js';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

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
