import { query, pool, mysqlConnection } from '../db/dbConfig';

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

      // Get item stock
      const [item] = await connection.query("SELECT stock, price FROM johnnysku WHERE id = ?", [skuId]);

      if(item.stock < quantity) {
        throw Error(item.stock ? `Available qty is ${item.stock}`: "Sorry we're out of stock") // throw custom error instead
      }

      // make order
      const sql = `
        INSERT INTO JohnnyOrderLog (time_created, employeeId, skuId, quantity, totalPrice) 
        VALUES (now(),	?,	?,	?,	?)
      `;
      const orderResult = await connection.query(sql, [employeeId, skuId, quantity, (item.price * quantity)]);

      // Update product stock
      const skuUpdateQuery = `UPDATE johnnysku SET stock = (? - ?) WHERE id = ?`;
      const skuUpdate = await connection.query(skuUpdateQuery, [item.stock, quantity, skuId]);

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

      // return {orderResult, skuUpdate, paymentInsert, updateOrderwithPayment};
      return;

    } catch (err) {
      await connection.query("ROLLBACK");
      throw err;
    } finally {
      await connection.release();
    }
  }
}
