import express, { Router } from "express";
import { addUpdateUser } from "../controllers/userController";
import { authMiddleware } from "../middleware/auth";

const router: Router = express.Router();

router.post('/', authMiddleware, addUpdateUser);

export default router;
