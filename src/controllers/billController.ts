import { RequestHandler } from 'express';
import { Employee } from '../models';


export const getUnpaidBill: RequestHandler = async (req, res, next) => {
  const { id: employeeId } = req.user;

  try {    
    const unpaidBillForCurrentMonth = await Employee.unpaidBill(+employeeId)

    const message = unpaidBillForCurrentMonth ? 
      `Your total bill for the current month is $${unpaidBillForCurrentMonth}` :
      'You do not have any unpaid bills for this months'

    return res.status(200).json({ message })

  } catch(error) { next(error) }
}
