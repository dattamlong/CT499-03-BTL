import { Document, ObjectId } from 'mongoose';

export interface IUserDocument extends Document {
  _id: string | ObjectId;
  email: string;
  password: string;
  isAdmin: boolean;

  firstName: string;
  lastName: string;
  gender: '0' | '1' | 'unknown';
  birthday: Date;
  address: string;
  phoneNumber: string;

  createdAt: Date;
  updatedAt: Date;

  comparePassword(password: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
}
