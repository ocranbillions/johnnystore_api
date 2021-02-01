import { query } from '../db/dbConfig';

interface paymentI {
  employeeId: number
  amount: number
}


export class Payment {
  constructor() {}


  static create = async(payment: paymentI): Promise<boolean> => {
    const { employeeId, amount } = payment;
    const sql = `
      INSERT INTO JohnnyPaymentLog (time_created, employeeId, amount) 
      VALUES ('2019-09-01 10:30:00', ?,	?)
    `;
    const paymentId = await query(sql, [employeeId, +amount]);
    
    return paymentId;
  }
  
}

// id int(11) NOT NULL AUTO_INCREMENT,
// `time_created` datetime NOT NULL,
// `employeeId` int(11) NOT NULL, /* JohnnyEmployee */
// `skuId` int(11) NOT NULL, /* JohnnySku */
// `quantity` int(11) NOT NULL,
// `totalPrice` int(11) NOT NULL,
// `paidInBox`  int(11) NULL, /* JohnnyPaymentLog */

// CREATE TABLE `JohnnyPaymentLog` (
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `time_created` datetime NOT NULL, 
//   `employeeId` int(11) NOT NULL, /* JohnnyEmployee */
//   `amount` int(11) NOT NULL,
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8;