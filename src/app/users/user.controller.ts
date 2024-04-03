import { NextFunction, Request, Response } from 'express';

import userService from './user.service';
import { responseList, responseOne } from '@root/utils/response';
import { validation } from '@root/utils/validation';
import { decode } from 'jsonwebtoken';
import getDecodedJWT from '@root/utils/getDecodedJWTFromReq';

const userController = {
  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getAllUsers();
      return responseList(res, users);
    } catch (error) {
      next(Error);
    }
  },

  getOneUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.getUserById(req.params.id);
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
      const { id } = req.body.id;
      await userService.deleteUser(id);
      res.status(200).json({ message: `Delete user ${id} successfully!` });
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
