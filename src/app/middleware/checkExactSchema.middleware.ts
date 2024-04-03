import { ValidationChain, checkExact } from 'express-validator';

export const checkExactSchema = (schema: ValidationChain[]) => {
  const message_unknow_field = 'The field appears to be disallowed.';
  return checkExact(schema, { message: message_unknow_field });
};
