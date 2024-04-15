import { body } from 'express-validator';

const basedBookChains = [
  body('image').optional({ nullable: true }).isString().withMessage('Hình ảnh không hợp lệ!'),
  body('publishYear').optional({ nullable: true }).isInt({ max: 2024 }).withMessage('Năm xuất bản không hợp lệ!'),
  body('publisher').optional({ nullable: true }).isString().withMessage('Nhà xuất bản phải là kiểu chuỗi!'),
  body('author').optional({ nullable: true }).isString().withMessage('Tác giả phải là kiểu chuỗi!'),
];

const createBookChains = [
  body('title').notEmpty().withMessage('Tiêu đề  là bắt buộc').isString().withMessage('Tiêu đề phải là kiểu chuỗi!'),
  body('price').notEmpty().withMessage('Giá tiền là bắt buộc').isFloat({ min: 0 }).withMessage('Giá tiền phải là kiểu số thực!'),
  body('quantity').notEmpty().withMessage('Số lượng sách là bắt buộc').isInt({ min: 0 }).withMessage('Số lượng sách phải là số nguyên!'),
  ...basedBookChains,
];

const updateBookChains = [
  body('title').optional({ nullable: true }).isString().withMessage('Tiêu đề là bắt buộc!'),
  body('price').optional({ nullable: true }).isInt({ min: 0 }).withMessage('Giá tiền là bắt buộc!'),
  body('quantity').optional({ nullable: true }).isInt({ min: 0 }).withMessage('Số lượng sách phải là kiểu số nguyên!'),
  ...basedBookChains,
];

export { basedBookChains, createBookChains, updateBookChains };
