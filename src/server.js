import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { env } from './utils/env.js';
import router from './routers/contacts.js';

const PORT = Number(env('PORT', 3000));

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

export function setupServer() {
  const app = express();
  const httpLogger = pinoHttp({ logger });

  // Налаштування cors
  app.use(cors());

  // Налаштування логгера pino
  app.use(httpLogger);

  // Додаю обробку JSON
  app.use(express.json());

  // Додаю роутер
  app.use('/contacts', router); // Можна використовувати будь-який префікс, наприклад '/api', але я '/contacts'

  // Обробка неіснуючих роутів
  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Обробка помилок
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return app;
}
