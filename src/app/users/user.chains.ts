import { body } from 'express-validator';
import { IUserDocument } from './user.interface';
import userService from './user.service';

export const IbasedUserInfoChains = [
  body('firstName').optional({ nullable: true }).isString().withMessage('First name must be of type string'),
  body('lastName').optional({ nullable: true }).isString().withMessage('Last name must be of type string'),
  body('gender')
    .optional({ nullable: true })
    .custom(async (value) => {
      if (value !== '0' && value !== '1' && value !== 'unknow') throw new Error('Gender must be 0 or 1 or unknow');
    }),
  body('birthday').optional({ nullable: true }).isDate().withMessage('Ngày không hợp lệ'),
  body('email').isEmail().withMessage('Email không hợp lệ'),
  body('address').optional({ nullable: true }).isString().withMessage('Last name must be of type string'),
  body('phoneNumber').optional({ nullable: true }).isString().withMessage('Last name must be of type string'),
];

export const userChains = [
  body('email')
    .isString()
    .withMessage('Email must be of type string.')
    .isEmail()
    .withMessage('Email must be valid.')
    .notEmpty()
    .withMessage('Email is a required field')
    .custom(async (value) => {
      const isUserExit: IUserDocument = await userService.getUserByEmail(value);
      if (isUserExit) throw new Error('Email already existed.');
    }),
  body('password')
    .isString()
    .withMessage('Password must be of type string')
    .isLength({ min: 8, max: 30 })
    .withMessage('Password must be between 8 and 30 characters in length.')
    .notEmpty()
    .withMessage('password is a required field'),
  body('isAdmin').optional({ nullable: true }).isBoolean().withMessage('Is Admin must be boolean.'),
  ...IbasedUserInfoChains,
];
