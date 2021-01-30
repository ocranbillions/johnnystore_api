import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

const validate: RequestHandler = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const cleanedErrorObjects: Array<object> = [] // todo Create interface
  errors.array().map(err => cleanedErrorObjects.push({ [err.param]: err.msg }))

  // throw custom Error - todo
  
  return res.status(400).json({
    success: false,
    errors: cleanedErrorObjects,
  })
}

export default validate;