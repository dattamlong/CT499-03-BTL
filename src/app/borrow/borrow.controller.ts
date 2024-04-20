import { NextFunction, Request, Response } from 'express';
import borrowService from './borrow.service';
import { responseList, responseOne } from '@root/utils/response';
import { validation } from '@root/utils/validation';
import HTTP_STATUS from 'http-status-codes';
import getDecodedJWT from '@root/utils/getDecodedJWTFromReq';

const borrowController = {
  getAllBorrows: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const search = req.query.search as string;
      const borrows = await borrowService.getAllBorrows(search);
      return responseList(res, borrows);
    } catch (error) {
      next(error);
    }
  },

  createBorrow: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!validation(req, res)) return;
      const borrow = await borrowService.createBorrow(req.body);
      return responseOne(res, borrow);
    } catch (error) {
      next(error);
    }
  },

  getByReader: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      const { userId }: any = getDecodedJWT(token!);
      const borrows = await borrowService.getBorrowByReaderId(userId);
      return responseList(res, borrows);
    } catch (error) {
      next(error);
    }
  },

  getOneBorrow: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const borrow = await borrowService.getBorrowById(req.params.id);
      return responseOne(res, borrow);
    } catch (error) {
      next(error);
    }
  },

  updateBorrow: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!validation(req, res)) return;
      const borrow = await borrowService.updateBorrow(req.params.id, req.body);
      return responseOne(res, borrow);
    } catch (error) {
      next(error);
    }
  },

  deleteBorrow: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      await borrowService.deleteBorrow(id);
      res.status(HTTP_STATUS.OK).json({ message: `Xóa theo dỗi mượn sách ${id} thành công!` });
    } catch (error) {
      next(error);
    }
  },
};

export default borrowController;
