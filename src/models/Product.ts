import { format } from 'date-fns';
import { query } from '../database/mysql';

interface ProductI {
  id: number
  name: string
  price: number
  stock: number
}


export class Product {
  constructor() {}

  static getStock = async(): Promise<ProductI[]> => {
    const sql = `SELECT * from JohnnySku WHERE stock > 0`;
    const result = await query(sql);
    return result;
  }

  static getTopSelling = async(from: string, to: string): Promise<ProductI[]> => {
    const startDate = format(new Date(from), "yyyy-MM-dd")
    const endDate = format(new Date(to), "yyyy-MM-dd")

    const sql = `
      SELECT item.id, item.name, item.price, sum(quantity) AS qtySold 
      FROM JohnnyOrderLog AS log
      INNER JOIN JohnnySku AS item
      ON log.skuId = item.id
      WHERE (log.time_created BETWEEN ? AND ?)
      GROUP BY skuId ORDER BY qtySold DESC
    `;

    const result = await query(sql, [startDate, endDate]);
    
    return result;
  }
  
}