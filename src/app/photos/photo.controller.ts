import ApiError from '@root/utils/ApiError';
import { NextFunction, Request, Response } from 'express';
import path from 'path';
import HTTP_STATUS from 'http-status-codes';

import { message } from '../constants/message';

export const photoController = {
  uploadPhoto: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, message.upload_photo_failed);
      }
      const source = req.params.source;
      const imagePath = path.join(source, req.file.filename);
      res.status(200).json({ imagePath: imagePath });
      return;
    } catch (error) {
      next(error);
    }
  },
};
