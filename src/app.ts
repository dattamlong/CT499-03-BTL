import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import compression from 'compression';

import { Config } from './config';

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
    //middleware to use for all requests
    this.app.use('/', (req, res) => {
      res.json({ message: 'Ánh sao và bầu trời' });
    });
  }
}

export default new App().app;
