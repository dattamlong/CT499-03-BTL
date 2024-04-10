import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import HTTP_STATUS from 'http-status-codes';

import authService from './auth.service';
import userService from '@users/user.service';
import { validation } from '@root/utils/validation';
import { IUserDocument } from '@users/user.interface';
import ApiError from '@root/utils/ApiError';
import { config } from '@root/config';
import { message } from '../constants/message';

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!validation(req, res)) return;
      const user = await userService.createUser(req.body);
      const token = authService.signToken({ user });
      return res.status(HTTP_STATUS.OK).json(token);
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!validation(req, res)) return;
      const { email, password } = req.body;
      const existingUser: IUserDocument = await userService.getUserByEmail(email);
      if (!existingUser) throw new ApiError(403, message.wrong_email_pass);
      const validPassword = await existingUser.comparePassword(password);
      if (!validPassword) throw new ApiError(403, message.wrong_email_pass);
      const token = authService.signToken({ user: existingUser });
      res.status(HTTP_STATUS.OK).json({ user: existingUser, token });
    } catch (error) {
      next(error);
    }
  },

  refresh: async (req: Request, res: Response, next: NextFunction) => {
    try {
      var decoded: any = jwt.verify(req.body.refreshToken, config.JWT_REFRESH_KEY);
      const token = authService.signToken({ user: { _id: decoded.userId, isAdmin: decoded.isAdmin, email: decoded.email } });
      res.status(HTTP_STATUS.OK).json(token);
    } catch (error) {
      next(error);
    }
  },
};
