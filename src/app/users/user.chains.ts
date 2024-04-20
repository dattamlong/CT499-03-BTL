import { body } from 'express-validator';
import { IUserDocument } from './user.interface';
import userService from './user.service';

export const IbasedUserInfoChains = [
  body('avatar').optional({ nullable: true }).isString().withMessage('Ảnh đại diện không hợp lệ.'),
  body('firstName').notEmpty().withMessage('Tên không được để trống.').isString().withMessage('Tên phải thuộc kiểu chuỗi.'),
  body('lastName').notEmpty().withMessage('Họ không được để trống.').isString().withMessage('Họ phải thuộc kiểu chuỗi.'),
  body('gender').custom(async (value) => {
    if (value !== '0' && value !== '1' && value !== 'unknown') throw new Error('Giới tính không hợp lệ.');
  }),
  body('birthday').notEmpty().withMessage('Ngày sinh không được để trống').isISO8601().toDate().withMessage('Ngày không hợp lệ'),
  body('address').isString().withMessage('Địa chỉ phải thuộc kiểu chuỗi'),
  body('phoneNumber')
    .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)
    .withMessage('Số điện thoại không hợp lệ'),
];

export const userChains = [
  body('email')
    .isString()
    .withMessage('Email phải thuộc kiểu chuỗi.')
    .isEmail()
    .withMessage('Email không hợp lệ.')
    .notEmpty()
    .withMessage('Email không được để  trống.')
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
  body('isAdmin').optional({ nullable: true }).isBoolean(),
  ...IbasedUserInfoChains,
];
