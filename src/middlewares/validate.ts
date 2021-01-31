import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import CustomError from '../utils/CustomError'

const validate: RequestHandler = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const errorList: Array<object> = []
  errors.array().map(err => errorList.push({ [err.param]: err.msg }))

  throw new CustomError('Invalid Inputs!', 400, errorList);
  
}

export default validate;