import HTTP_STATUS from 'http-status-codes';

import ApiError from '@root/utils/ApiError';
import { IUserDocument } from './user.interface';
import { UserModel } from './user.model';
import { ObjectId } from 'mongoose';
import { message } from '../constants/message';

const userService = {
  getAllUsers: async () => {
    return await UserModel.find();
  },

  deleteUser: async (id: string | ObjectId) => {
    return await UserModel.findByIdAndDelete(id);
  },

  getUserByEmail: async (email: string): Promise<IUserDocument> => {
    return (await UserModel.findOne({ email: email }).exec()) as IUserDocument;
  },

  createUser: async (user: IUserDocument) => {
    const newUser = new UserModel(user);
    await newUser.save();
    return newUser;
  },

  updateUser: async (id: string, info: IUserDocument) => {
    return (await UserModel.findOneAndUpdate({ _id: id }, info, { new: true })
      .exec()
      .then()
      .catch(() => {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, message.user_not_found);
      })) as IUserDocument;
  },

  getUserById: async (id: string | ObjectId): Promise<IUserDocument> => {
    return await UserModel.findById(id);
  },

  isUserExit: async (email: string) => {
    return await userService.getUserByEmail(email);
  },
};

export default userService;
