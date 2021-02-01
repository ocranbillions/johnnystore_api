import { query, pool, mysqlConnection } from '../db/dbConfig';

interface OrderI {
  employeeId: number
  skuId: number
  quantity: number
  totalPrice: number
  paidInBox?: boolean
}


export class Order {
  constructor() {}

  static initiateTransaction = async(order: OrderI): Promise<any> => {
    const { employeeId, skuId, quantity, totalPrice, paidInBox } = order;
    
    const connection = await mysqlConnection();
    try {

      await connection.query("START TRANSACTION");

      console.group("Starting Transaction")

      // Get current stock
      const [item] = await connection.query("SELECT stock, price FROM johnnysku WHERE id = ?", [skuId]);

      if(item.stock < quantity) {
        throw Error(item.stock ? `Available qty is ${item.stock}`: "Sorry we're out of stock") // throw custom error instead
      }

      const sql = `
        INSERT INTO JohnnyOrderLog (time_created, employeeId, skuId, quantity, totalPrice) 
        VALUES ('2019-09-01 10:30:00',	?,	?,	?,	?)
      `;

      const orderResult = await connection.query(sql, [employeeId, skuId, quantity, (item.price * quantity)]);

      // Update product quantity (skuId, quantity)
      const skuUpdateQuery = `UPDATE johnnysku SET stock = (? - ?) WHERE id = ?`;
      const skuUpdate = await connection.query(skuUpdateQuery, [item.stock, quantity, skuId]);

      let paymentInsert, updateOrderwithPayment;
      if(paidInBox) {

        const paymentInsertQuery = `
          INSERT INTO JohnnyPaymentLog (time_created, employeeId, amount)
          VALUES (now(), ?, ?)
        `;
        
        paymentInsert = await connection.query(paymentInsertQuery, [employeeId, (item.price * quantity)]);


        const updateOrderQuery = `UPDATE JohnnyOrderLog SET paidInBox = ? WHERE id = ?`;

        updateOrderwithPayment = await connection.query(updateOrderQuery, [paymentInsert.insertId, orderResult.insertId]);

      } else {
        // Update employee debt
        
      }

      await connection.query("COMMIT");
      return {orderResult, skuUpdate, paymentInsert, updateOrderwithPayment};

    } catch (err) {
      await connection.query("ROLLBACK");
      throw err;
    } finally {
      await connection.release();
    }
  }
}
