import { RequestHandler } from 'express';
import { Product } from '../models';


export const fetchAvailableStock: RequestHandler = async (req, res, next) => {
  try {
    const prodsInStock = await Product.availableStock();

    return res.status(200).json({ prodsInStock })

  } catch(error) { next(error) }
}
