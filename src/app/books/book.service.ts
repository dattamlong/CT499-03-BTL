import HTTP_STATUS from 'http-status-codes';

import { UserModel } from '@users/user.model';
import { IBookDocument } from './book.interface';
import { BookModel } from './book.model';
import ApiError from '@root/utils/ApiError';
import { message } from '../constants/message';

export const bookService = {
  getAllBooks: async (title: string) => {
    return (await BookModel.find({ title: { $regex: title, $options: 'i' } }).exec()) as IBookDocument[];
  },

  getBookById: async (id: string) => {
    return await BookModel.findById(id);
    // .exec()
    // .then()
    // .catch(() => {
    //   throw new ApiError(HTTP_STATUS.NOT_FOUND, message.book_not_found);
    // })) as IBookDocument;
  },

  createBook: async (data: IBookDocument) => {
    return (await BookModel.create(data)) as IBookDocument;
  },

  updateBook: async (id: string, info: IBookDocument) => {
    return (await BookModel.findByIdAndUpdate(id, info, { new: true })
      .then()
      .catch(() => {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, message.book_not_found);
      })) as IBookDocument;
  },

  deleteBook: async (id: string) => {
    return await UserModel.findByIdAndDelete(id)
      .exec()

      .catch(() => {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, message.book_not_found);
      });
  },
};
