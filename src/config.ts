import dotenv from 'dotenv';

dotenv.config();

export class Config {
  static portNumber: string | number = process.env.PORT || 3000;

  // JWT
  static privateKey: string = process.env.PRIVATE_KEY || '@981s19127gas8AJHV@98';
  static tokenExpiry: number = 30 * 60 * 1000;

  static mongoUrl: string = process.env.MONGODB_URL || '';
}
