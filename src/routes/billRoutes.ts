import { Router } from 'express';
import JWT from '../middlewares/JWT';
import validationRules from '../middlewares/validationRules';
import validate from '../middlewares/validate';
import { 
  getCurrUsersBill, 
  getEmployeeBill 
} from '../controllers/billController';


const router = Router();

router.use(JWT.isLoggedIn);

router.get('/', getCurrUsersBill);

router.post('/', 
  JWT.isAdmin,
  validationRules('email'),
  validate,
  getEmployeeBill
);


export default router;