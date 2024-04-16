import { Model, Schema, model } from 'mongoose';
import { IBorrowDocument } from './borrow.interface';

const borrowSchema: Schema = new Schema(
  {
    reader: { type: String },
    book: { type: String },
    borrowingDay: { type: Date },
    returnDay: { type: Date },
  },
  { timestamps: true },
);

borrowSchema.index({ '$**': 'text' });

const BorrowModel: Model<IBorrowDocument> = model<IBorrowDocument>('Borrow', borrowSchema, 'borrows');
export { BorrowModel };
