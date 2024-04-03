import { NextFunction, Request, Response } from 'express';
import userService from './user.service';

const userController = {
  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(Error);
    }
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userService.deleteUser(req.body.id);
      res.status(200).json({ message: 'Delete successfully!' });
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
