import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../user/user.model';

const userController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteOne: async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json(user);
      res.status(200).json({ message: 'Delete successfully!' });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default userController;
