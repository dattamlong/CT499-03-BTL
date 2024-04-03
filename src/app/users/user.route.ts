import { Router } from 'express';
import userController from './user.controller';
import authMiddleware from '../auth/auth.middleware';
import { checkExactChains } from '../middleware/checkExactChains.middleware';
import { IbasedUserInfoChains } from './user.chains';

const userRoute = Router();

//user profile
userRoute.get('/me', authMiddleware.verifyToken, userController.getProfile);
userRoute.patch('/me', authMiddleware.verifyToken, checkExactChains(IbasedUserInfoChains), userController.updateProfile);
//===========================================================================
userRoute.get('/', authMiddleware.verifyTokenAndAdminAuth, userController.getAllUsers);
userRoute.get('/:id', authMiddleware.verifyTokenAndAdminAuth, userController.getOneUser);
userRoute.patch('/:id', authMiddleware.verifyTokenAndAdminAuth, checkExactChains(IbasedUserInfoChains), userController.updateUser);
userRoute.delete('/:id', authMiddleware.verifyTokenAndAdminAuth, userController.deleteUser);

export default userRoute;
