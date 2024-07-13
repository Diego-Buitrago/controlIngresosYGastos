import { Router} from 'express';
const router = Router();

import { validateToken } from '../controller/generarController';

router.get('/validate_token', validateToken);
  
export default router; 