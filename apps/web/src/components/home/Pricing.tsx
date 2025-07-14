import { Stack } from '@chakra-ui/react';
import { PricingCard } from './PricingCard';
import { Section } from './Section';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Plan } from '@models/plan';
import { redirect } from 'next/navigation';
import { getPlans, startCheckout } from '@lib/api';

export const Pricing = () => {
   const { data: session } = useSession();
   const [plans, setPlans] = useState<Plan[]>([]);

   useEffect(() => {
      const fetchPlans = async () => {
         const result = await getPlans();
         setPlans(result.data || []);
      };
      fetchPlans();
   }, []);

   const handleSubscribe = async (priceId?: string) => {
      if (!priceId) {
         window.scrollTo(0, 0);
         return;
      }
      if (!session) {
         redirect('/register');
      }
      const data = await startCheckout(priceId, session);
      if (data.url) {
         window.location.href = data.url;
      }
   };

   return (
      <Section
         id="pricing"
         py={'6em'}
         title="Simple Monthly Pricing"
         subTitle="Start for free. Upgrade anytime. Cancel whenever."
      >
         <Stack
            direction={'row'}
            justifyContent={'center'}
            alignItems={'flex-start'}
            gap={6}
            w={'100%'}
            h={'100%'}
         >
            {plans.map((plan, index) => (
               <PricingCard
                  key={index}
                  title={plan.name}
                  tag={plan.tag}
                  description={plan.description}
                  price={plan.price}
                  features={plan.features}
                  onClick={() => handleSubscribe(plan.stripePriceId)}
                  buttonText={plan.buttonText}
                  primary={plan.primary}
               />
            ))}
         </Stack>
      </Section>
   );
};
