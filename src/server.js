import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

export function setupServer() {
  const app = express();
  const httpLogger = pinoHttp({ logger });

  // Налаштування cors
  app.use(cors());

  // Налаштування логгера pino
  app.use(httpLogger);

  // Обробка неіснуючих роутів
  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return app;
}
