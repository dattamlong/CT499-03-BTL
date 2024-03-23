import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import compression from 'compression';

import { Config } from './config';
import { authRouter } from './admin/routes/auth.route';

//routers

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  //configure Express middleware
  private middleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    mongoose.connection.on('connected', () => {
      console.log('[server]: Connected to database successfully!');
    });
    mongoose.connect(Config.mongoUrl);

    this.app.use(express.static(__dirname + '/../public/'));

    this.app.use(compression());
  }

  private routes(): void {
    this.app.use('/auth', authRouter.getRouter());
  }
}

export default new App().app;
