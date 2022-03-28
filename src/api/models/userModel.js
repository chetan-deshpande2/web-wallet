import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, require: true, unique: true, trim: true },
    password: {
      type: String,
      required: true
    },
    mnemonics: { type: String },
    isVerified: { type: Boolean, required: true },
    isAdmin: {
      type: Number,
      default: 0, // !0 for user and 1 for admin
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
