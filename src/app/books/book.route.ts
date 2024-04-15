import { Router } from 'express';
import { checkExactChains } from '../middleware/checkExactChains.middleware';
import bookController from './book.controller';
import { createBookChains, updateBookChains } from './book.chains';
import authMiddleware from '@auth/auth.middleware';

const bookRoute = Router();

bookRoute.post('/', authMiddleware.verifyTokenAndAdminAuth, checkExactChains(createBookChains), bookController.createBook);
bookRoute.get('/', authMiddleware.verifyToken, bookController.getAllBooks);
bookRoute.get('/:id', authMiddleware.verifyToken, bookController.getBook);
bookRoute.patch('/:id', authMiddleware.verifyTokenAndAdminAuth, checkExactChains(updateBookChains), bookController.updateBook);

export default bookRoute;
