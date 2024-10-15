import { Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

export const responseList = <T>(res: Response, data: T[]) => {
  const jsonData = {
    count: data.length,
    data: data,
  };

  return res.status(HTTP_STATUS.OK).json(jsonData);
};

export const responseOne = <T>(res: Response, data: T) => {
  return res.status(HTTP_STATUS.OK).json(data);
};
