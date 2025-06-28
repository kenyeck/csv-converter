import express from 'express';
import { getDb } from '../lib/mongodb';
import { Plan } from '../types/plan';

const router = express.Router();

router.get('/', async (req, res) => {
   try {
      const db = await getDb();
      const plans = await db.collection<Plan[]>('plans').find().toArray();
      return res.json(plans);
   } catch (err) {
      return res.status(500).json({ error: `Database error: ${err}` });
   }
});

export default router;
