/* eslint-disable turbo/no-undeclared-env-vars */
import { json, urlencoded } from 'body-parser';
import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import planRoutes from './routes/planRoutes';
import stripeRoutes from './routes/stripeRoutes';
import userRoutes from './routes/userRoutes';
import { authHandler } from './auth';

export const createServer = (): Express => {
   const app = express();
   app.disable('x-powered-by')
      .use(morgan('dev'))
      .use(urlencoded({ extended: true }))
      .use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }))
      .use('/api/auth', authHandler)
      .use('/api/stripe', stripeRoutes) // process before json parser, webhook needs raw body
      .use(json())
      .use('/api/plans', planRoutes)
      .use('/api/users', userRoutes);
   return app;
};
