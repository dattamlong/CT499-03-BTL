import jwt from 'jsonwebtoken';
import HTTP_STATUS from 'http-status-codes';

import { IUserDocument } from '@users/user.interface';
import { config } from '@root/config';
import ApiError from '@root/utils/ApiError';
import { message } from '../constants/message';

const authService = {
  signToken: ({ user }: { user: Pick<IUserDocument, '_id' | 'isAdmin' | 'email'> }) => {
    const accessToken = jwt.sign(
      {
        userId: user._id,
        isAdmin: user.isAdmin,
        email: user.email,
      },
      config.JWT_ACCESS_KEY,
      { expiresIn: '3d' },
    );
    const refreshToken = jwt.sign(
      {
        userId: user._id,
        isAdmin: user.isAdmin,
        email: user.email,
      },
      config.JWT_REFRESH_KEY,
      { expiresIn: '30d' },
    );

    return { accessToken, refreshToken };
  },

  verifyToken: (token: string, jwtKey: string) => {
    return jwt.verify(token, jwtKey, (error, decoded) => {
      if (error) throw new ApiError(HTTP_STATUS.FORBIDDEN, message.not_auth);
      return decoded;
    });
  },
};

export default authService;
