import { ObjectId, Document } from 'mongoose';

export interface IBookDocument extends Document {
  _id: string | ObjectId;
  title: string;
  price: number;
  quantity: number;
  publishYear: number;
  publisher: string;
  author: string;
}
