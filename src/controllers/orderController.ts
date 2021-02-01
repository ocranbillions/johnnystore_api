import { RequestHandler } from 'express';
import { Order, Payment } from '../models';


export const makeOrder: RequestHandler = async (req, res, next) => {
  const {employeeId, skuId, quantity, totalPrice, paidInBox } = req.body;
  try {

    // MYSQL TRANSACTION
    const ord = await Order.initiateTransaction({
      employeeId,
      skuId,
      quantity,
      totalPrice,
      paidInBox,
    });

    // Update product quantity (skuId, quantity)

    // if(paymentMade) {
    //   Payment.create({
    //     employeeId,
    //     amount: totalPrice,
    //   })
    // }

    // Update order
    // await Order.update(ord.id, ord)

    // If payment not made
      // update employee debt else update employee wallets
    


    return res.status(201).json({ message: "Order successfully made, You now owe a total of $5000 this month", ord })

  } catch(error) { next(error) }
}


// highest selling=
// SELECT skuId, name, SUM(quantity) AS totalSold
// FROM johnnyorderlog 
// INNER JOIN johnnysku 
// ON johnnysku.id = johnnyorderlog.skuId
// GROUP BY skuId
// ORDER BY 3 DESC
