import { NextFunction, Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import userService from './user.service';
import { responseList, responseOne } from '@root/utils/response';
import { validation } from '@root/utils/validation';
import getDecodedJWT from '@root/utils/getDecodedJWTFromReq';
import ApiError from '@root/utils/ApiError';

const userController = {
  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const search = req.query.search as string;
      const users = await userService.getAllUsers(search);
      return responseList(res, users);
    } catch (error) {
      next(Error);
    }
  },

  createUser: async (req: Request, res: Response, next: NextFunction) => {
    if (!validation(req, res)) return;
    try {
      const users = await userService.createUser(req.body);
      return responseOne(res, users);
    } catch (error) {
      next(Error);
    }
  },

  getOneUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) throw new ApiError(HTTP_STATUS.NOT_FOUND, "User doesn't exist.");
      return responseOne(res, user);
    } catch (error) {
      next(error);
    }
  },

  getProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      const { userId }: any = getDecodedJWT(token!);
      const profile = await userService.getUserById(userId);
      return responseOne(res, profile);
    } catch (error) {
      next(error);
    }
  },

  updateProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!validation(req, res)) return;
      const token = req.headers.authorization;
      const { userId }: any = getDecodedJWT(token!);
      const profile = await userService.updateUser(userId, req.body);
      return responseOne(res, profile);
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!validation(req, res)) return;
      const user = await userService.updateUser(req.params.id, req.body);
      return responseOne(res, user);
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      await userService.deleteUser(id);
      res.status(HTTP_STATUS.OK).json({ message: `Xóa tài khoản ${id} thành công!` });
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
