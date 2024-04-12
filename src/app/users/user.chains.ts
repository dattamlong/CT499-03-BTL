import { body } from 'express-validator';
import { IUserDocument } from './user.interface';
import userService from './user.service';

export const IbasedUserInfoChains = [
  body('avatar').optional({ nullable: true }).isString().withMessage('Đường dẫn ảnh đại diện không hợp lệ'),
  body('firstName').optional({ nullable: true }).isString().withMessage('Tên phải thuộc kiểu chuỗi.'),
  body('lastName').optional({ nullable: true }).isString().withMessage('Họ phải thuộc kiểu chuỗi.'),
  body('gender')
    .optional({ nullable: true })
    .custom(async (value) => {
      if (value !== '0' && value !== '1' && value !== 'unknow') throw new Error('Giới tính không hợp lệ');
    }),
  body('birthday').optional({ nullable: true }).isISO8601().toDate().withMessage('Ngày không hợp lệ'),
  body('address').optional({ nullable: true }).isString().withMessage('Địa chỉ phải thuộc kiểu chuỗi'),
  body('phoneNumber').optional({ nullable: true }).isString().withMessage('Số điện thoại không hợp lệ'),
];

export const userChains = [
  body('email')
    .isString()
    .withMessage('Email phải thuộc kiểu chuỗi')
    .isEmail()
    .withMessage('Email không hợp lệ.')
    .notEmpty()
    .withMessage('Email không được để  trống')
    .custom(async (value) => {
      const isUserExit: IUserDocument = await userService.getUserByEmail(value);
      if (isUserExit) throw new Error('Email đã tồn tại.');
    }),
  body('password')
    .isString()
    .withMessage('Mật khẩu phải thuộc kiểu chuỗi.')
    .isLength({ min: 8, max: 30 })
    .withMessage('Mật khẩu phải có độ dài từ 8 đến 30 kí tự.')
    .notEmpty()
    .withMessage('Mật khẩu không được để  trống.'),
  body('isAdmin').optional({ nullable: true }).isBoolean().withMessage('Is Admin must be boolean.'),
  ...IbasedUserInfoChains,
];
