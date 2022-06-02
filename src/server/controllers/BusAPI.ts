import { Router } from 'express';
import { cors } from '../util/Middleware.js';

const router = Router();

router.use(cors);

export default router;