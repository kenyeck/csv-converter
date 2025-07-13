/* eslint-disable turbo/no-undeclared-env-vars */
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
   const authHeader = req.headers.authorization;
   if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No or invalid authorization header' });
   }

   const token = authHeader.split(' ')[1];
   const _decoded = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET ?? '',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err: any | null, decoded: any | undefined) => {
         if (err) {
            console.error('JWT verification failed:', err);
            return res.status(403).json({ error: 'Token invalid' });
         }

         console.log('JWT decoded:', decoded);
         next();
      }
   );
}
