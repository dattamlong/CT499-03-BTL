import { Router } from 'express';

import { authController } from './auth.controller';
import { loginChains } from './auth.chains';
import authMiddleware from './auth.middleware';
import { checkExactChains } from '../middleware/checkExactChains.middleware';
import { userChains } from '@users/user.chains';

const authRoute = Router();

authRoute.post('/register', checkExactChains(userChains), authController.register);
authRoute.post('/login', checkExactChains(loginChains), authController.login);
authRoute.post('/refresh', authMiddleware.verifyToken, authController.refresh);

export default authRoute;
