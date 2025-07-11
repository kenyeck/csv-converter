import { Stack } from '@chakra-ui/react';
import { PricingCard } from './PricingCard';
import { Section } from './Section';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { Plan } from '@models/plan';

const pricingPlans: Plan[] = [
   {
      name: 'Pro',
      description: 'Remove all limits and unlock every tool for power users.',
      tag: 'All Features',
      price: '$14.99/mo',
      features: [
         'Unlimited file uploads',
         'Import Excel (XLS, XLSX), CSV, TXT, JSON, XML',
         'Unlimited row previews',
         'Advanced filtering & sorting',
         'Rename headers with drag & drop',
         'Split & combine columns',
         'Find & replace (supports regex)',
         'Automatic data type detection',
         'Export full JSON & XML with formatting',
         'Handle large files with intelligent chunking',
         'Access to all future updates'
      ],
      buttonText: 'Upgrade to Pro',
      priceId: '',
      primary: true
   },
   {
      name: 'Starter',
      description: 'Try the converter with 5 files. No sign-up required.',
      tag: 'Free For Life',
      price: '$0/mo',
      features: ['Process up to 5 files'],
      buttonText: 'Try Free',
      priceId: ''
   }
];

export const Pricing = () => {
   const { data: session } = useSession();
   const [plans, setPlans] = useState<Plan[]>([]);

   useEffect(() => {
      const fetchPlans = async () => {
         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stripe/plans`);
         const data = await response.json();
         const pricingPlansWithIds = pricingPlans.map((plan, i) => ({
            ...plan,
            priceId: data[i]?.id || ''
         }));
         setPlans(pricingPlansWithIds);
      };
      fetchPlans();
   }, []);

   const handleSubscribe = async (priceId: string) => {
      if (!session) {
         console.error('User is not authenticated');
         await signIn(undefined, { redirect: false });
      }
      console.log('Subscribing to plan with priceId:', priceId);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stripe/create-checkout-session`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            //userId: session?.user?.id,
            email: session?.user?.email,
            priceId: priceId
         })
      });

      const data = await res.json();

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
                  onClick={() => handleSubscribe(plan.priceId)}
                  buttonText={plan.buttonText}
                  primary={plan.primary}
               />
            ))}
         </Stack>
      </Section>
   );
};
