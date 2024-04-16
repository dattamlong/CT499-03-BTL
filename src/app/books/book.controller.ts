import HTTP_STATUS from 'http-status-codes';
import { validation } from '@root/utils/validation';
import { NextFunction, Request, Response } from 'express';
import { bookService } from './book.service';
import { responseList, responseOne } from '@root/utils/response';
import userService from '@users/user.service';

const bookController = {
  getAllBooks: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const search = req.query.search as string;
      const books = await bookService.getAllBooks(search);
      return responseList(res, books);
    } catch (error) {
      next(error);
    }
  },

  createBook: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!validation(req, res)) return;
      const newBook = await bookService.createBook(req.body);
      res.status(HTTP_STATUS.CREATED).json(newBook);
    } catch (error) {
      next(error);
    }
  },

  getBook: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!validation(req, res)) return;
      const book = await bookService.getBookById(req.params.id);
      return responseOne(res, book);
    } catch (error) {
      next(error);
    }
  },

  updateBook: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!validation(req, res)) return;
      const book = await bookService.updateBook(req.params.id, req.body);
      return responseOne(res, book);
    } catch (error) {
      next(error);
    }
  },

  deleteBook: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      await bookService.deleteBook(id);
      res.status(HTTP_STATUS.OK).json({ message: `Xóa sách ${id} thành công!` });
    } catch (error) {
      next(error);
    }
  },
};

export default bookController;
