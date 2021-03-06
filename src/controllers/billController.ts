import { RequestHandler } from 'express';
import { Employee } from '../models';
import CustomError from '../utils/CustomError';


// Unpaid bill of currently logged in user 
// i.e. either employee or johnnystore admin
export const getCurrUsersBill: RequestHandler = async (req, res, next) => {
  const { id: userId } = req.user;

  try {    
    const unpaidBillForCurrentMonth = await Employee.unpaidBill(+userId)

    const message = unpaidBillForCurrentMonth ? 
      `Your total bill for the current month is $${unpaidBillForCurrentMonth}` :
      'You do not have any unpaid bills for this month'

    return res.status(200).json({ message })

  } catch(error) { next(error) }
}


export const getEmployeeBill: RequestHandler = async (req, res, next) => {
  const employeeEmail = req.body.employeeEmail.toLowerCase();

  try {    
    const employee = await Employee.findOne(employeeEmail);
      
    if (!employee) throw new CustomError("Employee not found!", 404)

    const unpaidBillForCurrentMonth = await Employee.unpaidBill(employee.id!)

    const message = unpaidBillForCurrentMonth ? 
      `${employee.name}'s total bill for the current month is $${unpaidBillForCurrentMonth}` :
      `${employee.name} does not have any unpaid bills for this month`

    return res.status(200).json({ message })

  } catch(error) { next(error) }
}
