import { IUserDocument } from './user.interface';
import { UserModel } from './user.model';
import { ObjectId } from 'mongoose';

const userService = {
  getAllUsers: async (search?: string) => {
    let query = {};

    if (search) {
      query = {
        $text: { $search: search },
      };
    }

    return await UserModel.find(query);
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
    return (await UserModel.findOneAndUpdate({ _id: id }, info, { new: true })) as IUserDocument;
  },

  getUserById: async (id: string | ObjectId): Promise<IUserDocument> => {
    return (await UserModel.findById(id)) as IUserDocument;
  },

  isUserExit: async (email: string) => {
    return await userService.getUserByEmail(email);
  },
};

export default userService;
