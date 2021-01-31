import jwt, {Secret} from 'jsonwebtoken';

interface JwtPayloadI {
  name: string
  email: string
  id: number
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
}

