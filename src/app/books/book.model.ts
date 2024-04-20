import { Model, Schema, model } from 'mongoose';
import { IBookDocument } from './book.interface';
import { BorrowModel } from '../borrow/borrow.model';

const bookSchema: Schema = new Schema(
  {
    image: { type: String },
    title: { type: String, default: '' },
    price: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
    category: { type: String, default: 'other' },
    publishYear: { type: Number, default: 1999 },
    publisher: { type: String, default: '' },
    author: { type: String, default: '' },
  },
  { timestamps: true },
);

bookSchema.index({ '$**': 'text' });

bookSchema.pre('findOneAndDelete', async function (next) {
  let id = this.getQuery()['_id'];
  await BorrowModel.deleteMany({ book: id });
  next();
});

const BookModel: Model<IBookDocument> = model<IBookDocument>('Book', bookSchema, 'books');
export { BookModel };
