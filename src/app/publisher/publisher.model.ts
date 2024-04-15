import { Model, Schema, model } from 'mongoose';
import { IPublisherDocument } from './publisher.interface';

const publisherSchema: Schema = new Schema(
  {
    name: { type: String, default: '' },
    address: { type: String, default: '' },
  },
  {
    timestamps: true,
  },
);

const PublisherModel: Model<IPublisherDocument> = model<IPublisherDocument>('Publisher', publisherSchema, 'publishers');
export { PublisherModel };
