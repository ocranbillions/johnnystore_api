import { RequestHandler } from 'express';
import { Order, Employee } from '../models';

export const makeOrder: RequestHandler = async (req, res, next) => {
  const { skuId, quantity, paidInBox } = req.body;
  const { id: employeeId } = req.user;
  try {

    // MYSQL TRANSACTION
    await Order.initiateTransaction({
      employeeId,
      skuId,
      quantity,
      paidInBox,
    });

    const unpaidBillForCurrentMonth = await Employee.unpaidBill(+employeeId)

    const message = unpaidBillForCurrentMonth ? 
    `Transaction completed - Your total bill for the current month ${paidInBox ? 'remains' : 'is now'} $${unpaidBillForCurrentMonth}` :
    'Transaction completed - You do not have any unpaid bills for this months'

    return res.status(201).json({ message })

  } catch(error) { next(error) }
}
