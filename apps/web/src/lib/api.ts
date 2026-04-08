import { Session, User } from 'next-auth';
import { ApiResult } from '../models/api';
import { Plan } from '../models/plan';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export async function callApi(url: string, options: RequestInit = {}, session?: Session): Promise<Response> {
   const headers: Record<string, string> = {
      ...options.headers,
      'Content-Type': 'application/json'
   } as Record<string, string>;
   if (session?.accessToken) {
      headers['Authorization'] = `Bearer ${session.accessToken}`;
   }
   return fetch(url, {
      ...options,
      headers
   });
}

export const API_ROUTES = {
   PLANS: `${API_BASE_URL}/api/plans`,
   USERS: `${API_BASE_URL}/api/users`,
   STRIPE_SESSION: `${API_BASE_URL}/api/stripe/create-checkout-session`
};

export const getPlans = async (): Promise<ApiResult<Plan[]>> => {
   const response = await fetch(API_ROUTES.PLANS, {
      method: 'GET'
   });

   const result: ApiResult<Plan[]> = {
      status: response.status,
      statusText: response.statusText,
      data: await response.json()
   };
   return result;
};

export const addUpdateUser = async (user: User, session?: Session) => {
   const response = await callApi(
      API_ROUTES.USERS,
      {
         method: 'POST',
         body: JSON.stringify({
            name: user.name,
            email: user.email
         })
      },
      session
   );

   if (!response.ok) {
      throw new Error(`Failed to add/update user: ${response.statusText}`);
   }

   return await response.json();
};

export const startCheckout = async (priceId: string, session: Session) => {
   //console.log('Subscribing to plan with priceId:', priceId);
   //console.log('Session in Pricing:', session);
   const res = await callApi(
      API_ROUTES.STRIPE_SESSION,
      {
         method: 'POST',
         body: JSON.stringify({
            //userId: session?.user?.id,
            email: session?.user?.email,
            priceId: priceId
         })
      },
      session
   );
   const data = await res.json();
   return data;
};
