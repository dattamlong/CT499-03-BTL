import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Error } from 'mongoose';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  if (err instanceof Error.CastError) {
    // console.log(err.name);
    // console.log(err.stack);
    console.log(err.model.modelName);
    return res.status(400).json({ message: `${err.model.modelName} not found` });
  }

  const responseError = {
    message: err.message || StatusCodes[err.statusCode],
  };
  res.status(err.statusCode).json(responseError);
};
