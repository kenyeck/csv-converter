import express from 'express';
import { getUser, login, logout, refresh } from '../controllers/authController';

const router = express.Router();

router.post('/login', login);
router.get('/getuser', getUser);
router.post('/refresh', refresh);
router.post('/logout', logout);

export default router;