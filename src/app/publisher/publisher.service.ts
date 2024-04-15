import { ObjectId } from 'mongoose';
import { PublisherModel } from './publisher.model';
import { IPublisherDocument } from './publisher.interface';

const publisherService = {
  getAllPublisher: async () => {
    return await PublisherModel.find();
  },

  deletePublisher: async (id: string | ObjectId) => {
    return await PublisherModel.findByIdAndDelete(id);
  },

  createPublisher: async (publisher: IPublisherDocument) => {
    const newPublisher = new PublisherModel(publisher);
    await newPublisher.save();
    return newPublisher;
  },

  updatePublisher: async (id: string, info: IPublisherDocument) => {
    return await PublisherModel.findOneAndUpdate({ _id: id }, info, { new: true });
  },

  getPublisherById: async (id: string | ObjectId): Promise<IPublisherDocument> => {
    return (await PublisherModel.findById(id)) as IPublisherDocument;
  },
};

export default publisherService;
