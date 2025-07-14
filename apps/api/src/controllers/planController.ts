import { getDb } from "@lib/mongodb";
import { Request, Response } from "express";
import { Plan } from "@models/plan";

export const getPlans = async (req: Request, res: Response) => {
   try {
      const db = await getDb();
      const plans = await db.collection<Plan>('plans').find().toArray();
      return res.json(plans.sort((a, b) => a.order - b.order));
   }
    catch (err) {
      return res.status(500).json({ error: `Database error: ${err}` });
   }
};