import { NextFunction, Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

import { config } from '@root/config';
import ApiError from '@root/utils/ApiError';
import authService from './auth.service';
import { message } from '../constants/message';

const authMiddleware = {
  verifyToken: (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (token) {
      const accessToken = token.split(' ')[1];
      authService.verifyToken(accessToken, config.JWT_ACCESS_KEY);
      next();
    } else {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, message.not_auth);
    }
  },

  verifyTokenAndAdminAuth: (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (token) {
      const accessToken = token.split(' ')[1];
      const decoded: any = authService.verifyToken(accessToken, config.JWT_ACCESS_KEY);
      if (!decoded.isAdmin) throw new ApiError(HTTP_STATUS.FORBIDDEN, message.not_permission);
      next();
    } else {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, message.not_auth);
    }
  },
};

export default authMiddleware;
