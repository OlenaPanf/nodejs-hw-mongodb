import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import dotenv from 'dotenv';

dotenv.config();

const logger = pino({
  transport: {
    target: 'pino-pretty',
    // options: {
    //   colorize: true,
    // },
  },
});

export function setupServer() {
  const app = express();
  const httpLogger = pinoHttp({ logger });

  // Налаштування cors
  app.use(cors());

  // Налаштування логгера pino
  app.use(httpLogger);

  // Додати обробку JSON
  app.use(express.json());

  // Додамо обробник для GET-запиту на головний маршрут
  //   app.get('/', (req, res) => {
  //     res.send('Hello, world!');
  //   });

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

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return app;
}
