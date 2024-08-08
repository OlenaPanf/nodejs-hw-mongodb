import { registerNewUser } from '../services/auth.js';
import createHttpError from 'http-errors';

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // Спроба зареєструвати нового користувача
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
  } catch (error) {
    // Використання createHttpError для створення помилок
    if (error.status && error.message) {
      next(error);
    } else {
      next(createHttpError(500, 'Something went wrong'));
    }
  }
};

//або
// catch (error) {
//     next(error);
//   }

//лекція
// import { registerUser } from '../services/auth.js';

// export const registerUserController = async (req, res) => {
//   const user = await registerUser(req.body);

//   res.status(201).json({
//     status: 201,
//     message: 'Successfully registered a user!',
//     data: user,
//   });
// };
