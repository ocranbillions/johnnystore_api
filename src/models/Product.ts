import { query } from '../db/dbConfig';

interface ProductI {
  id: number
  name: string
  price: number
  stock: number
}

export class Product {
  constructor() {}


  // static availableStock: Promise<ProductI[]> = async() => {
  //   const sql = `SELECT * from johnnysku WHERE stock > 0`;
  //   const result = await query(sql);
  //   return result;
  // }

  static availableStock = async(): Promise<ProductI[]> => {
    const sql = `SELECT * from johnnysku WHERE stock > 0`;
    const result = await query(sql);
    return result;
  }
  
}

// highest selling
// SELECT skuId, name, SUM(quantity) AS totalSold
// FROM johnnyorderlog 
// INNER JOIN johnnysku 
// ON johnnysku.id = johnnyorderlog.skuId
// GROUP BY skuId
// ORDER BY 3 DESC