import HTTP_STATUS from 'http-status-codes';

import { IBookDocument } from './book.interface';
import { BookModel } from './book.model';
import { ObjectId } from 'mongoose';

export const bookService = {
  getAllBooks: async (search: string) => {
    let query = {};
    if (search) {
      query = {
        $text: { $search: search },
      };
    }
    return await BookModel.find(query);
  },

  getBookById: async (id: string) => {
    return await BookModel.findById(id);
  },

  createBook: async (data: IBookDocument) => {
    return (await BookModel.create(data)) as IBookDocument;
  },

  updateBook: async (id: string, info: IBookDocument) => {
    return (await BookModel.findByIdAndUpdate(id, info, { new: true })) as IBookDocument;
  },

  deleteBook: async (id: string | ObjectId) => {
    return await BookModel.findByIdAndDelete(id);
  },
};
