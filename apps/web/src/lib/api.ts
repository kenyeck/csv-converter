import { ApiResult } from "../models/api";
import { Plan } from "../models/plan";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export const API_ROUTES = {
   PLANS: `${API_BASE_URL}/api/plans`
};

export const getPlans = async (): Promise<ApiResult<Plan[]>> => {
   const response = await fetch(API_ROUTES.PLANS, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json'
      }
   });

   const result: ApiResult<Plan[]> = {
      status: response.status,
      statusText: response.statusText,
      data: await response.json()
   };
   return result;
}