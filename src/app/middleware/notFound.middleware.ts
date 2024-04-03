import ApiError from '@root/utils/ApiError';
import { message } from '../constants/message';

export const notFound = () => {
  throw new ApiError(404, message.not_found_url);
};
