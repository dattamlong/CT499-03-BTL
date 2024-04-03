import { Router } from 'express';
import { authController } from './auth.controller';
import { loginSchema, registerSchema } from './auth.schema';
import { checkExactSchema } from '../middleware/checkExactSchema.middleware';
import userService from '@users/user.service';
import authMiddleware from './auth.middleware';

const authRoute = Router();

authRoute.post('/register', checkExactSchema(registerSchema), authController.register);
authRoute.post('/login', checkExactSchema(loginSchema), authController.login);
authRoute.post('/refresh', authMiddleware.verifyToken, authController.refresh);

export default authRoute;
