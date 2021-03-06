import { query, pool, mysqlConnection } from '../database/mysql';
import CustomError from '../utils/CustomError';

interface OrderI {
  employeeId: number
  skuId: number
  quantity: number
  paidInBox?: boolean
}


export class Order {
  constructor() {}

  static initiateTransaction = async(order: OrderI): Promise<any> => {
    const { employeeId, skuId, quantity, paidInBox } = order;
    
    const connection = await mysqlConnection();
    try {
      
      await connection.query("START TRANSACTION");
      const [item] = await connection.query("SELECT stock, price FROM JohnnySku WHERE id = ?", [skuId]);

      if(!item) throw new CustomError(`The item with the id ${skuId} cannot be found`, 404);
      
      // Get item stock
      if(item.stock < quantity) {
        const msg = item.stock ? `Available qty is ${item.stock}`: "Sorry we're out of stock"
        throw new CustomError(msg, 400)
      }

      // place order
      const sql = `
        INSERT INTO JohnnyOrderLog (time_created, employeeId, skuId, quantity, totalPrice) 
        VALUES (now(),	?,	?,	?,	?)
      `;
      const orderResult = await connection.query(sql, [employeeId, skuId, quantity, (item.price * quantity)]);

      // Update product stock
      const skuUpdateQuery = `UPDATE JohnnySku SET stock = (? - ?) WHERE id = ?`;
      await connection.query(skuUpdateQuery, [item.stock, quantity, skuId]);

      let paymentInsert, updateOrderwithPayment;
      if(paidInBox) {
        // record payment
        const paymentInsertQuery = `
          INSERT INTO JohnnyPaymentLog (time_created, employeeId, amount)
          VALUES (now(), ?, ?)
        `;
        paymentInsert = await connection.query(paymentInsertQuery, [employeeId, (item.price * quantity)]);

        // update order entry
        const updateOrderQuery = `UPDATE JohnnyOrderLog SET paidInBox = ? WHERE id = ?`;
        updateOrderwithPayment = await connection.query(updateOrderQuery, [paymentInsert.insertId, orderResult.insertId]);

      }

      await connection.query("COMMIT");
      return;

    } catch (err) {
      await connection.query("ROLLBACK");
      throw err;
    } finally {
      await connection.release();
    }
  }
}
