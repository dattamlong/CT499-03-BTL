import { IUserDocument } from './user.interface';
import { UserModel } from './user.model';
import { ObjectId } from 'mongoose';

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
  isUserExit: async (email: string) => {
    return await userService.getUserByEmail(email);
  },
};

export default userService;
