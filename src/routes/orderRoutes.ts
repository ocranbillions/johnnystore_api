import { Router } from 'express';
import { placeOrder } from '../controllers/orderController';
import JWT from '../middlewares/JWT'
import validationRules from '../middlewares/validationRules';
import validate from '../middlewares/validate';


const router = Router();

router.use(JWT.isLoggedIn);

router.post('/',
  validationRules('placeOrder'),
  validate,
  placeOrder
);


export default router;