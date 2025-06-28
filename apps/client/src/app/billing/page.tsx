'use client';

import { Fragment, useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { Box, Button, Card } from '@chakra-ui/react';
import { Section } from '@components/home/Section';
import { Upgrade } from '@components/Upgrade';
import { useSession } from 'next-auth/react';
import { Plan } from 'types/plan';
import { getPlans } from 'app/api/api';

export default function BillingPage() {
   const { data: session } = useSession();
   const [open, setOpen] = useState(false);
   const [plans, setPlans] = useState<Plan[]>([]);
   const [plan, setPlan] = useState<Plan>();

   const planName = 'Free Plan';

   if (!session) {
      redirect('/api/auth/signin');
   }

   useEffect(() => {
      const fetchPlans = async () => {
         const { data } = await getPlans();
         console.log('getPlans:', data);
         setPlans(data.data);
      };
      fetchPlans();
   }, []);

   return (
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={20}>
         <Section
            id="file-conversion"
            pt={'3em'}
            mb={5}
            title={'Billing & Subscription'}
            fontSize={'0.75em'}
         >
            <Box>
               <Card.Root variant={'elevated'} px={'0.5em'}>
                  <Card.Header>
                     <Box fontSize={'2em'} fontWeight={'bold'}>
                        Current Plan
                     </Box>
                     <Box fontSize={'1.2em'} color={'fg.muted'}>
                        Manage your subscription and billing information
                     </Box>
                  </Card.Header>
                  <Card.Body>
                     <Box fontSize={'1.5em'} fontWeight={'lightbold'} mb={4}>
                        You are currently on the{' '}
                        <span style={{ fontWeight: 'bold' }}>{planName}</span>
                     </Box>
                     {plans.length > 0 &&
                        plans.map((plan, key) => (
                           <Fragment key={key}>
                              <Box fontSize={'1.2em'} color={'fg.muted'}>
                                 {`Upgrade to ${plan.name} to unlock all features and benefits`}
                              </Box>
                              <Button
                                 variant={'solid'}
                                 colorPalette={'blue'}
                                 w={130}
                                 mt={6}
                                 onClick={() => {
                                    setPlan(plan);
                                    setOpen(true);
                                 }}
                              >
                                 {`Upgrade to ${plan.name}`}
                              </Button>
                           </Fragment>
                        ))}
                  </Card.Body>
               </Card.Root>
            </Box>
         </Section>
         <Upgrade open={open} onOpenChange={(e) => setOpen(e.open)} plan={plan} />
      </Box>
   );
}
