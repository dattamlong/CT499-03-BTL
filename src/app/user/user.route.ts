import { Router } from 'express';
import authController from '../auth/auth.controller';
import UserController from './user.controller';

class UserRouter {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public getRouter(): Router {
    this.router.get('/', UserController.getAll);
    return this.router;
  }
}

export const userRouter: UserRouter = new UserRouter();
