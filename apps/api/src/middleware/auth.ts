/* eslint-disable turbo/no-undeclared-env-vars */
import { Request, Response, NextFunction } from 'express';
import { auth, authConfig } from '../auth';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
   const session = await auth(req, res, authConfig);
   if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
   }
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   (req as any).session = session;
   next();
}
