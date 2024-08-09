import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, match: /.+\@.+\..+/ },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }, // нова властивість
  },
  { timestamps: true, versionKey: false },
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;

// {
//     "name": "Yulia Shevchenko",
//     "phoneNumber": "+380000000001",
//     "email": "oleh1@example.com",
//     "isFavourite": false,
//     "contactType": "personal",
//     "createdAt": "2024-05-08T16:12:14.954151",
//     "updatedAt": "2024-05-08T16:12:14.954158"
//   }
