import { Model, Schema, model } from 'mongoose';
import { IBookDocument } from './book.interface';

const bookSchema: Schema = new Schema(
  {
    image: { type: Array<String> },
    title: { type: String, default: '' },
    price: { type: Number, default: 0 },
    quatity: { type: Number, default: 0 },
    publishYear: { type: Number, default: 1999 },
    publisher: { type: String, default: '' },
    author: { type: String, default: '' },
  },
  { timestamps: true },
);

bookSchema.index({ '$**': 'text' });

const BookModel: Model<IBookDocument> = model<IBookDocument>('Book', bookSchema, 'books');
export { BookModel };
