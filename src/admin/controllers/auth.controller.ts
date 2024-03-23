import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.model';

const authController = {
  registerUser: async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, birthdate, gender, email, address, phoneNumber, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      const newUser = new User({
        firstName,
        lastName,
        birthdate,
        gender,
        email,
        address,
        phoneNumber,
        password: hashed,
      });

      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  loginUser: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) return res.status(404).json('Wrong email!');

      if (!user.password) {
        return res.status(500).json('User password is not set!');
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) res.status(404).json('Wrong password!');

      if (user && validPassword) res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

export default authController;
