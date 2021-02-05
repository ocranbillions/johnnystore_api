import jwt, { Secret } from 'jsonwebtoken';
import { RequestHandler } from 'express';
import CustomError from '../utils/CustomError'

// export interface GetUserAuthInfoRequestI extends Request {
//   user: JwtPayloadI;
// }

interface JwtPayloadI {
  id: number;
  name: string;
  email: string;
}


declare global {
  namespace Express {
    interface Request {
      user: JwtPayloadI;
    }
  }
}

export default class JWT {
  static secret = process.env.JWT_SECRET as Secret;
  
  static generate = (payload: JwtPayloadI) => {
    return jwt.sign(
      payload,
      JWT.secret,
      { expiresIn: '1day' },
    );
  }

  static isLoggedIn: RequestHandler = (req, res, next) => {
    const token = req.headers.authorization!
  
    try {
      const decoded = jwt.verify(token, JWT.secret) as JwtPayloadI;
      req.user = decoded;
      return next();
  
    }catch(error) {
      throw new CustomError('Your session expired. Please sign in!', 401)
    }
  }
}

