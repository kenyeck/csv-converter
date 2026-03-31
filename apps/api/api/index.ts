import { createServer } from '../src/server';
import type { Request, Response } from 'express';

const app = createServer();

export default function handler(req: Request, res: Response) {
   return app(req, res);
}
