import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const validation = (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).json(result.formatWith((error) => error.msg).mapped());
};
