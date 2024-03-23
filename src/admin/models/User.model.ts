import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    birthdate: { type: Date },
    gender: { type: String, enum: ['Male', 'Female'] },
    email: {
      type: String,
      require: true,
      unique: true,
      index: true,
    },
    address: { type: String },
    phoneNumber: { type: String, unique: true },
    password: {
      type: String,
      require: true,
      minLength: 8,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);
export default User;
