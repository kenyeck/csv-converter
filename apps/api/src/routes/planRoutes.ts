import express, { Router } from "express";
import { getPlans } from "../controllers/planController";

const router: Router = express.Router();

router.get('/', getPlans);

export default router;
