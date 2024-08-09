import { registerNewUser, loginUser } from '../services/auth.js';
import { THIRTY_DAYS } from '../constants/index.js';

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
    next(error);
  }
};

//логін користувача
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const session = await loginUser({ email, password });

    // логіка для створення та встановлення токенів
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
      message: 'Successfully logged in an user!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};
