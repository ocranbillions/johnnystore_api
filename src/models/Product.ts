import { query } from '../db/dbConfig';

interface ProductI {
  id: number
  name: string
  price: number
  stock: number
}

export class Product {
  constructor() {}

  static availableStock = async(): Promise<ProductI[]> => {
    const sql = `SELECT * from johnnysku WHERE stock > 0`;
    const result = await query(sql);
    return result;
  }
  
}