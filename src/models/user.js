import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }, // автоматично додає поля createdAt і updatedAt
);

const User = mongoose.model('User', userSchema);

export default User;

// name - string, required
// email - string, email, unique, required
// password - string, required
// createdAt - дата створення
// updatedAt - дата оновлення
