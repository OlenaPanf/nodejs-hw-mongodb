import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export const initMongoConnection = async () => {
  try {
    const user = env('MONGODB_USER');
    const pwd = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
    );
    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};
//=========================================
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// export const initMongoConnection = async () => {
//   try {
//     const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } =
//       process.env;
//     const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;
//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1);
//   }
// };
