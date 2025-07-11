import { json, urlencoded } from 'body-parser';
import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import planRoutes from './routes/planRoutes';
import stripeRoutes from './routes/stripeRoutes';

export const createServer = (): Express => {
   const app = express();
   app.disable('x-powered-by')
      .use(morgan('dev'))
      .use(urlencoded({ extended: true }))
      .use(cors())
      .use('/api/stripe', stripeRoutes) // process before json parser, webhook needs raw body
      .use(json())
      .use('/api/plans', planRoutes);
   return app;
};
