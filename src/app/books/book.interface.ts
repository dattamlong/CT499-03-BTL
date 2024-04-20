import { ObjectId, Document } from 'mongoose';

export interface IBookDocument extends Document {
  _id: string | ObjectId;
  title: string;
  price: number;
  category: 'novel' | 'science' | 'self-help' | 'other';
  quantity: number;
  publishYear: number;
  publisher: string;
  author: string;
}
