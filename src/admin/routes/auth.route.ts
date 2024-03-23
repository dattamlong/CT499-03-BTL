import { Router } from 'express';
import authController from '../controllers/auth.controller';

class AuthRouter {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public getRouter(): Router {
    this.router.post('/register', authController.registerUser);
    this.router.post('/login', authController.loginUser);
    return this.router;
  }
}

export const authRouter: AuthRouter = new AuthRouter();
