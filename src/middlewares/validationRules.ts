import { body, check, checkSchema } from 'express-validator';

const validationRules = (method: string) => {
  switch (method) {
    case 'register':
      return [
        body('name')
          .trim()
          .not().isEmpty()
          .withMessage('Name cannot be empty'),
        body('email')
          .isEmail()
          .withMessage('Email is invalid'),
        body('password')
          .trim()
          .isLength({ min: 6 })
          .withMessage('Password must be at least 6 characters'),
      ]
    case 'login':
      return [
        body('email')
          .isEmail()
          .withMessage('Email is invalid'),
        body('password')
          .trim()
          .isLength({ min: 6 })
          .withMessage('Password must be at least 6 characters'),
      ]
    default:
      return [] // todo
  }
}

export default validationRules;