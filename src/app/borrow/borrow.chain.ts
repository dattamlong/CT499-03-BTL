import { body } from 'express-validator';

const borrowChains = [
  body('reader').notEmpty().withMessage('Người đọc là bắt buộc!').isString().withMessage('Đọc giả không hợp lệ!'),
  body('book').notEmpty().withMessage('Sách là bắt buộc!').isString().withMessage('Sách không hợp lệ!'),
  body('borrowingDay').notEmpty().withMessage('Ngày mượn là bắt buộc').isISO8601().toDate().withMessage('Ngày mượn không hợp lệ!'),
  body('returnDay').notEmpty().withMessage('Ngày trả là bắt buộc').isISO8601().toDate().withMessage('Ngày trả không hợp lệ!'),
];

export { borrowChains };
