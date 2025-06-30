import { Stack } from '@chakra-ui/react';
import { PricingCard } from './PricingCard';
import { Section } from './Section';

const pricingPlans = [
   {
      title: 'Starter',
      description: 'Try the converter with 5 files. No sign-up required.',
      tag: 'Free For Life',
      price: '$0/mo',
      includes: ['Process up to 5 files'],
      buttonText: 'Try Free'
   },
   {
      title: 'Pro',
      description: 'Remove all limits and unlock every tool for power users.',
      tag: 'All Features',
      price: '$14.99/mo',
      includes: [
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
      primary: true
   }
];

export const Pricing = () => {
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
            {pricingPlans.map((plan, index) => (
               <PricingCard
                  key={index}
                  title={plan.title}
                  tag={plan.tag}
                  description={plan.description}
                  price={plan.price}
                  includes={plan.includes}
                  onClick={() => alert(`Selected ${plan.title}`)}
                  buttonText={plan.buttonText}
                  primary={plan.primary}
               />
            ))}
         </Stack>
      </Section>
   );
};
