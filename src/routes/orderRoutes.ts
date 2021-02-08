import { Router } from 'express';
import { makeOrder } from '../controllers/orderController';
import JWT from '../middlewares/JWT'


const router = Router();

router.use(JWT.isLoggedIn);

router.post('/', makeOrder);


export default router;