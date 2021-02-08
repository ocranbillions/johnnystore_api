import { Router } from 'express';
import { fetchAvailableStock } from '../controllers/productController';

const router = Router();

router.get('/', fetchAvailableStock);


export default router;