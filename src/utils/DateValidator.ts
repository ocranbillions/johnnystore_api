import { format } from 'date-fns';
import CustomError from '../utils/CustomError';

const DateValidator = (from: string, to: string) => {
  try {
    format(new Date(from), "yyyy-MM-dd")
    format(new Date(to), "yyyy-MM-dd")
  } catch(error) {
    throw new CustomError("Pls input valid date values", 400);
  }
}

export default DateValidator;
