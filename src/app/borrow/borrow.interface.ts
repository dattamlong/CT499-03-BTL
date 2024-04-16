import { Document, ObjectId } from 'mongoose';

export interface IBorrowDocument extends Document {
  _id: string | ObjectId;
  reader: string;
  book: string;
  borrowingDay: Date;
  returnDay: Date;
}
