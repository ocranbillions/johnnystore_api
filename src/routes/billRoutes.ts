import { Router } from 'express';
import { getUnpaidBill } from '../controllers/billController';
import JWT from '../middlewares/JWT'


const router = Router();

router.use(JWT.isLoggedIn);

router.get('/', getUnpaidBill);


export default router;