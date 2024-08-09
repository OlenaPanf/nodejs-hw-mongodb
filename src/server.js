import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { env } from './utils/env.js';
import router from './routers/index.js'; // імпортуємо новий файл роутів
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';

const PORT = Number(env('PORT', 3000));

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

export function setupServer() {
  const app = express();
  const httpLogger = pinoHttp({ logger });

  app.use(cors()); // Налаштування cors
  app.use(httpLogger); // Налаштування логгера pino
  app.use(express.json()); // Додаю обробку JSON
  app.use(cookieParser()); // Додаю middleware для обробки cookies

  app.use('/', router); // Додаю об'єднаний новий роутера

  app.use(notFoundHandler); // Обробка неіснуючих роутів
  app.use(errorHandler); // Обробка помилок

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return app;
}
