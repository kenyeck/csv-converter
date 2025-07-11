import express, { Router } from "express";
import { addUpdateUser, getUsers } from "../controllers/userController";

const router: Router = express.Router();

router.get('/', getUsers);
router.post('/', addUpdateUser);

export default router;
