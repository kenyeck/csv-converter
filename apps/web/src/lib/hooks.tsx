'use client';

import { useEffect, useState } from 'react';
import { Plan } from '../models/plan';
import { getPlans } from './api';

export function usePlans() {
   const [plans, setPlans] = useState<Plan[]>([]);

   useEffect(() => {
      const fetchPlans = async () => {
         const { data } = await getPlans();
         setPlans(data);
      };
      if (plans.length === 0) {
         fetchPlans();
      }
   });

   return plans;
}