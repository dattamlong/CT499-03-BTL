import { Router } from 'express';
import authMiddleware from '../auth/auth.middleware';
import { checkExactChains } from '../middleware/checkExactChains.middleware';
import publisherController from './publisher.controller';
import { PublisherChains } from './publisher.chain';

const publisherRoute = Router();

publisherRoute.get('/', authMiddleware.verifyTokenAndAdminAuth, publisherController.getAllPublisher);
publisherRoute.get('/:id', authMiddleware.verifyTokenAndAdminAuth, publisherController.getOnePublisher);
publisherRoute.patch('/:id', authMiddleware.verifyTokenAndAdminAuth, checkExactChains(PublisherChains), publisherController.updatePusher);
publisherRoute.post('/', authMiddleware.verifyTokenAndAdminAuth, checkExactChains(PublisherChains), publisherController.createPublisher);

export default publisherRoute;
