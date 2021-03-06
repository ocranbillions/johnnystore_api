import { RequestHandler } from 'express';
import { compareSync } from 'bcryptjs';
import { Employee } from '../models';
import JWT from '../middlewares/JWT';
import CustomError from '../utils/CustomError';


export const register: RequestHandler = async (req, res, next) => {
  req.body.email = req.body.email.toLowerCase();
  const { name, email } = req.body;

  try {
    const existingEmployee = await Employee.findOne(email);
    
    if (existingEmployee) throw new CustomError("Email in use!!", 409)

    const employee = new Employee(req.body)

    const insertId = await employee.create();

    const token = JWT.generate({name, email, id: insertId, isAdmin: false});

    return res.status(201).json({ token })

  } catch(error) { next(error) }
}


export const login: RequestHandler = async (req, res, next) => {
  req.body.email = req.body.email.toLowerCase();
  const { name, email, password } = req.body;

  try {
    const employee = await Employee.findOne(email);

    if (!employee || (!compareSync(password, employee.password))) 
      throw new CustomError("Incorrect login credentials", 401)

    const token = JWT.generate({name, email, id: employee.id!, isAdmin: employee.isAdmin});

    return res.status(200).json({ token })

  } catch(error) { next(error) }
}
