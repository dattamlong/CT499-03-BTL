import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import authService from './auth.service';
import userService from '@users/user.service';
import { validation } from '@root/utils/validation';
import { IUserDocument } from '@users/user.interface';
import ApiError from '@root/utils/ApiError';
import { config } from '@root/config';

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      validation(req, res);
      const user = await userService.createUser(req.body);
      const token = authService.signToken({ user });
      return res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message_forbidden = 'Email or password is wrong.';
      validation(req, res);
      const { email, password } = req.body;
      const existingUser: IUserDocument = await userService.getUserByEmail(email);
      if (!existingUser) throw new ApiError(403, message_forbidden);
      const validPassword = await existingUser.comparePassword(password);
      if (!validPassword) throw new ApiError(403, message_forbidden);
      const token = authService.signToken({ user: existingUser });
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  },

  refresh: async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(decoded);
      var decoded: any = jwt.verify(req.body.refreshToken, config.JWT_REFRESH_KEY);

      const token = authService.signToken({ user: { _id: decoded.userId, isAdmin: decoded.isAdmin, email: decoded.email } });
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  },
};
