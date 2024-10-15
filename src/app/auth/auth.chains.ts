import { body } from 'express-validator';

export const loginChains = [
  body('email')
    .isString()
    .withMessage('Email must be of type string.')
    .isEmail()
    .withMessage('Email must be valid.')
    .notEmpty()
    .withMessage('Email is a required field'),
  body('password')
    .isString()
    .withMessage('Password must be of type string')
    .isLength({ min: 8, max: 30 })
    .withMessage('password must be between 8 and 30 characters in length.')
    .notEmpty()
    .withMessage('password is a required field'),
];
