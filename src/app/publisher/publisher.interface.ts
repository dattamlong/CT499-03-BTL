import { Document, ObjectId } from 'mongoose';

export interface IPublisherDocument extends Document {
  _id: string | ObjectId;
  name: string;
  address: string;
}
