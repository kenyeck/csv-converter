'use client';

import { Fragment, useState } from 'react';
import { redirect } from 'next/navigation';
import { Box, Button, Card } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { Section } from '../../components/home/Section';
import { Upgrade } from '../../components/Upgrade';
import { usePlans } from '../../lib/hooks';
import { Plan } from '../../models/plan';

export default function BillingPage() {
   const { data: session } = useSession();
   const [open, setOpen] = useState(false);
   const [plan, setPlan] = useState<Plan>();
   const plans = usePlans();

   const planName = 'Free Plan';

   if (!session) {
      redirect('/api/auth/signin');
   }

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
                        plans
                           .filter((x) => parseInt(x.billingOptions[0].price['$numberDecimal']) > 0)
                           .map((plan, key) => (
                              <Fragment key={key}>
                                 <Box fontSize={'1.2em'} color={'fg.muted'}>
                                    {`Upgrade to ${plan.name} to unlock all features and benefits`}
                                 </Box>
                                 <Button
                                    variant={'solid'}
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
