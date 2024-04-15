import HTTP_STATUS from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { responseList, responseOne } from '@root/utils/response';
import publisherService from './publisher.service';
import ApiError from '@root/utils/ApiError';
import { message } from '../constants/message';
import { validation } from '@root/utils/validation';

const publisherController = {
  getAllPublisher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const publisher = await publisherService.getAllPublisher();
      return responseList(res, publisher);
    } catch (error) {
      next(Error);
    }
  },

  getOnePublisher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const publisher = await publisherService.getPublisherById(req.params.id);
      if (!publisher) throw new ApiError(HTTP_STATUS.NOT_FOUND, message.publisher_not_exist);
      return responseOne(res, publisher);
    } catch (error) {
      next(error);
    }
  },

  updatePusher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!validation(req, res)) return;
      const user = await publisherService.updatePublisher(req.params.id, req.body);
      return responseOne(res, user);
    } catch (error) {
      next(error);
    }
  },

  createPublisher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!validation(req, res)) return;
      const publisher = await publisherService.createPublisher(req.body);
      return responseOne(res, publisher);
    } catch (error) {
      next(error);
    }
  },
};

export default publisherController;
