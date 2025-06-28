'use client';

import { getPlans } from "app/api/api";
import { useEffect, useState } from "react";
import { Plan } from "types/plan";

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