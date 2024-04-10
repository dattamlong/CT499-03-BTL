import { body } from 'express-validator';

const basedBookChains = [
  body('publishYear').optional({ nullable: true }).isInt({ max: 2024 }).withMessage('PublishYear must be of typeString'),
  body('publisher').optional({ nullable: true }).isString().withMessage('Publisher must be of type string'),
  body('author').optional({ nullable: true }).isString().withMessage('Publisher must be of type string'),
];

const createBookChains = [
  body('title').notEmpty().withMessage('Title is required.').isString().withMessage('Title must be of type string'),
  body('price').notEmpty().withMessage('Price is required.').isInt({ min: 0 }).withMessage('Price must be of type Number'),
  body('quantity').notEmpty().withMessage('Qauntity is required').isInt({ min: 0 }).withMessage('Quantity muse be of type number'),
  ...basedBookChains,
];

const updateBookChains = [
  body('title').optional({ nullable: true }).isString().withMessage('Title must be of type string'),
  body('price').optional({ nullable: true }).isInt({ min: 0 }).withMessage('Price must be of type Number'),
  body('quantity').optional({ nullable: true }).isInt({ min: 0 }).withMessage('Quantity muse be of type number'),
  ...basedBookChains,
];

export { basedBookChains, createBookChains, updateBookChains };
