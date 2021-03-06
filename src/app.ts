import express, { Request, Response, NextFunction} from "express";
import morgan from 'morgan';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes'; 
import billRoutes from './routes/billRoutes'; 
import CustomError from './utils/CustomError';

const app = express();

app.use(express.json())
app.use(morgan("tiny"));

app.use('/auth', authRoutes)
app.use('/bills', billRoutes)
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

app.all('*', (req, res) => {
  throw new CustomError("Route not found!", 404)
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
