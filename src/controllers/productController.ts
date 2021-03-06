import { RequestHandler } from 'express';
import { Product } from '../models';
import DateValidator from '../utils/DateValidator';


export const fetchProducts: RequestHandler = async (req, res, next) => {
  
  let products;
  
  try {

    if(req.query.topselling) {

      const { from, to } = req.query;

      DateValidator(from as string, to as string)

      products = await Product.getTopSelling(from as string, to as string);

    } else 
        products = await Product.getStock();
    

    return res.status(200).json({ products })

  } catch(error) { next(error) }
}

