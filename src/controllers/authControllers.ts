import { RequestHandler } from 'express';
import { Employee } from '../models'

export const register: RequestHandler = async (req, res, next) => {
  try {

    const employee = new Employee(req.body)
    const result = await employee.create();

    return res.status(201).json({
      success: true,
      message: "done",
      data: result,
    })

  }catch(error) { next(error) }
}

export const login: RequestHandler = async (req, res, next) => {
  try {

    return res.status(200).json({
      success: true,
    })

  }catch(error) { next(error) }
}
