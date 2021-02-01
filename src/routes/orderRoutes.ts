import { Router } from 'express';
import { makeOrder } from '../controllers/orderController';

const router = Router();

router.post('/', makeOrder);


export default router;