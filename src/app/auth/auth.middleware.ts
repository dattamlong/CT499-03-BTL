import { NextFunction, Request, Response } from 'express';
import { config } from '@root/config';
import ApiError from '@root/utils/ApiError';
import authService from './auth.service';

const authMiddleware = {
  verifyToken: (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (token) {
      const accessToken = token.split(' ')[1];
      authService.verifyToken(accessToken, config.JWT_ACCESS_KEY, "you're are not authenticated");
      next();
    } else {
      throw new ApiError(404, "you're are not authenticated");
    }
  },

  verifyTokenAndAdminAuth: (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (token) {
      const accessToken = token.split(' ')[1];
      const decoded: any = authService.verifyToken(accessToken, config.JWT_ACCESS_KEY);
      if (!decoded.isAdmin) throw new ApiError(403, 'You do not have the authority to delete other users');
      next();
    } else {
      throw new ApiError(404, "you're are not authenticated");
    }
  },
};

export default authMiddleware;
