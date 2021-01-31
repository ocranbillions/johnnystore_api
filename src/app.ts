import express, { Request, Response, NextFunction} from "express";
import { config } from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes';
import CustomError from './utils/CustomError';

config()

const app = express();

app.use(express.json())
app.use(morgan("tiny"));
app.use('/auth', authRoutes)

app.all('*', (req, res) => {
  throw new CustomError("Page not found!", 404)
})

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {

  if(error instanceof CustomError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorList: error.errorList
    })
  }

  console.error(error)
  return res.status(500).json({
    message: error.message
    // message: "An error occured!"
  })

});

export default app;