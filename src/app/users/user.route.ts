import { Router } from 'express';
import userController from './user.controller';
import authMiddleware from '../auth/auth.middleware';
const userRoute = Router();

userRoute.get('/', authMiddleware.verifyToken, userController.getAllUsers);
userRoute.delete('/:id', authMiddleware.verifyTokenAndAdminAuth, userController.deleteUser);

export default userRoute;
