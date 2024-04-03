import jwt from 'jsonwebtoken';
import { IUserDocument } from '@users/user.interface';
import { config } from '@root/config';
import ApiError from '@root/utils/ApiError';

const authService = {
  signToken: ({ user }: { user: Pick<IUserDocument, '_id' | 'isAdmin' | 'email'> }) => {
    const accessToken = jwt.sign(
      {
        userId: user._id,
        isAdmin: user.isAdmin,
        email: user.email,
      },
      config.JWT_ACCESS_KEY!,
      { expiresIn: '1h' },
    );
    const refreshToken = jwt.sign(
      {
        userId: user._id,
        isAdmin: user.isAdmin,
        email: user.email,
      },
      config.JWT_REFRESH_KEY!,
      { expiresIn: '3d' },
    );

    return { accessToken, refreshToken };
  },

  verifyToken: (token: string, jwtKey: string, msg?: string) => {
    return jwt.verify(token, jwtKey, (error) => {
      if (error) throw new ApiError(403, msg || 'Token is not valid');
    });
  },
};

export default authService;
