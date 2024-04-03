import ApiError from '@root/utils/ApiError';
import { message } from '../constants/message';
import HTTP_STATUS from 'http-status-codes';

export const notFound = () => {
  throw new ApiError(HTTP_STATUS.NOT_FOUND, message.not_found_url);
};
