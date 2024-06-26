import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import expressWinston from 'express-winston';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoute from './app/auth/auth.route';
import userRoute from './app/users/user.route';
import logger from './utils/logger';
import { config } from './config';
import { errorHandler } from './app/middleware/errorHandler.middleware';
import { notFound } from './app/middleware/notFound.middleware';
import bookRoute from './app/books/book.route';
import photoRoute from './app/photos/photo.route';
import publisherRoute from './app/publisher/publisher.route';
import borrowRoute from './app/borrow/borrow.route';

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

    this.app.use(cors({ origin: '*' }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    mongoose.connection.on('connected', () => {
      console.log('[server]: Connected to database successfully!');
    });
    mongoose.connect(config.DB_URL);

    this.app.use(express.static('images'));

    this.app.use(compression());
  }

  private routes(): void {
    //url not found

    this.app.use('/auth', authRoute);

    this.app.use('/api/users', userRoute);

    this.app.use('/api/publishers', publisherRoute);

    this.app.use('/api/books', bookRoute);

    this.app.use('/api/photos', photoRoute);

    this.app.use('/api/borrows', borrowRoute);
  }

  private globalErrorHandler(): void {
    //url not found
    this.app.use(notFound);

    this.app.use(errorHandler);
  }
}

export default new App().app;
