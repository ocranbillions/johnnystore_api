import express, { Request, Response, NextFunction} from "express";
import authRoutes from './routes/authRoutes';
import {config} from 'dotenv';

config()

const app = express();

app.use(express.json())
app.use('/auth', authRoutes)


app.get("/", (req, res) => {
  res.status(200).json({
    success:true,
    message: "Welcome to Todoist"
  })
})

app.all('*', (req, res) => {
  return res.status(404).json({
    errors: [{message: "Page not found"}]
  })
})

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  const env = process.env.NODE_ENV;
  if (env === 'development' || env === 'test') {
    console.log(error.stack)
    return res.status(500).json({
      errors: [{message: error.message}]
    })
  }

  return res.status(500).json({
    errors: [{message: "something went wrong"}]
  })
});



export default app;