import { Router } from 'express';
import { register, login } from '../controllers/authControllers';
import validationRules from '../middlewares/validationRules';
import validate from '../middlewares/validate'

const router = Router();

router.post('/register',
  validationRules('register'),
  validate,
  register
);

router.post('/login',
  validationRules('login'),
  validate,
  login
);

export default router;