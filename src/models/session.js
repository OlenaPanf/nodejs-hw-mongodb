import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false }, // автоматично додає поля createdAt і updatedAt
);

const Session = mongoose.model('Session', sessionSchema);

export default Session;

// userId - string, required;
// accessToken - string, required;
// refreshToken - string, required;
// accessTokenValidUntil - Date, required;
// refreshTokenValidUntil - Date, required;
