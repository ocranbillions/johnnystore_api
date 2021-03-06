import { body, check, checkSchema } from 'express-validator';

const validationRules = (method: string) => {
  switch (method) {
    // AUTH VALIDATIONS
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

    // ORDER VALIDATIONS
    case 'placeOrder':
      return [
        body('skuId')
          .isInt()
          .withMessage('Please provide an skuId (item id)'),
        body('quantity')
          .isInt()
          .withMessage('Please provide the quantity'),
        body('paidInBox')
          .isBoolean()
          .withMessage("Please specify if you're paying in box. (true | false)"),
      ]

      
    case 'email':
      return [
        body('employeeEmail')
          .isEmail()
          .withMessage('Email is invalid'),
      ]
    default:
      return []
  }
}

export default validationRules;