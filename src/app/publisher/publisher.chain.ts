import { body } from 'express-validator';

export const PublisherChains = [
  body('name').optional({ nullable: true }).isString().withMessage('Tên nhà xuất bản phải là kiểu chuỗi!'),
  body('address').optional({ nullable: true }).isString().withMessage('Địa chỉ của nhà xuất bản phải là kiểu chuỗi!'),
];
