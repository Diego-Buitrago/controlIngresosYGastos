import { Router} from 'express';
const router = Router();

import { startSection } from '../controller/usersController';

router.post('/start_section', startSection);
  
export default router; 