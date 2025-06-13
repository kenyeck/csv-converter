import express from 'express';
import { getUser, login, logout, refresh, register, checkUsername } from '../controllers/authController';

const router = express.Router();

router.post('/login', login);
router.get('/getuser', getUser);
router.post('/checkusername', checkUsername);
router.post('/refresh', refresh);
router.post('/register', register);
router.post('/logout', logout);

export default router;