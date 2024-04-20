import { Router } from 'express';
import { checkExactChains } from '../middleware/checkExactChains.middleware';
import borrowController from './borrow.controller';
import authMiddleware from '@auth/auth.middleware';
import { borrowChains } from './borrow.chain';

const borrowRoute = Router();

borrowRoute.get('/reader', authMiddleware.verifyToken, borrowController.getByReader);
borrowRoute.post('/', authMiddleware.verifyToken, checkExactChains(borrowChains), borrowController.createBorrow);
borrowRoute.get('/', authMiddleware.verifyToken, borrowController.getAllBorrows);
borrowRoute.get('/:id', authMiddleware.verifyToken, borrowController.getOneBorrow);
borrowRoute.patch('/:id', authMiddleware.verifyTokenAndAdminAuth, checkExactChains(borrowChains), borrowController.updateBorrow);
borrowRoute.delete('/:id', authMiddleware.verifyTokenAndAdminAuth, borrowController.deleteBorrow);

export default borrowRoute;
