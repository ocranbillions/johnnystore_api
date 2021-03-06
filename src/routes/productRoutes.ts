import { Router } from 'express';
import { fetchProducts } from '../controllers/productController';

const router = Router();

router.get('/', fetchProducts);


export default router;