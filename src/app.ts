import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import expressWinston from 'express-winston';
import cookieParser from 'cookie-parser';

import authRoute from './app/auth/auth.route';
import userRoute from './app/users/user.route';
import logger from './utils/logger';
import { config } from './config';
import { errorHandler } from './app/middleware/errorHandler.middleware';

//routers

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
    this.globalErrorHandler();
  }

  //configure Express middleware
  private middleware(): void {
    this.app.use(cookieParser());

    this.app.use(
      expressWinston.logger({
        winstonInstance: logger,
      }),
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    mongoose.connection.on('connected', () => {
      console.log('[server]: Connected to database successfully!');
    });
    mongoose.connect(config.DB_URL);

    this.app.use(express.static(__dirname + '/../public/'));

    this.app.use(compression());
  }

  private routes(): void {
    this.app.use('/auth', authRoute);

    this.app.use('/api/user', userRoute);
  }

  private globalErrorHandler(): void {
    this.app.use(errorHandler);
  }
}

export default new App().app;
