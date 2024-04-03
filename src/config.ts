import dotenv from 'dotenv';
dotenv.config();

class Config {
  public PORT: number | string;
  public DB_URL: string;
  public JWT_ACCESS_KEY: string;
  public JWT_REFRESH_KEY: string;
  public NODE_ENV: string | undefined;

  private readonly DEFAULT_DB_URL = 'mongodb+srv://dat:datcoldd@book-store.yfuplhp.mongodb.net/?retryWrites=true&w=majority&appName=book-store';

  constructor() {
    this.PORT = process.env.PORT || 3000;
    this.DB_URL = process.env.DB_URL || this.DEFAULT_DB_URL;
    this.JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY || '11asdasdkljlasd';
    this.JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY || 'asdasdasdjbjk1@';
    this.NODE_ENV = process.env.NODE_ENV;
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) throw new Error(`Configuration ${key} is undefined.`);
    }
  }
}

export const config: Config = new Config();
