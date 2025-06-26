'use client';

import { useState } from 'react';
import { redirect } from 'next/navigation';
import { Box, Button, Card } from '@chakra-ui/react';
import { Section } from '@components/home/Section';
import { Upgrade } from '@components/Upgrade';
import { useSession } from 'next-auth/react';

export default function BillingPage() {
   const planName = 'Free Plan';
   const [open, setOpen] = useState(false);
   const { data: session } = useSession();

   if (!session) {
      redirect('/api/auth/signin');
   }

   return (
      <>
         <Section
            id="file-conversion"
            pt={'3em'}
            mb={5}
            title={'Billing & Subscription'}
            fontSize={'0.75em'}
         >
            <Box paddingBottom={150}>
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
                     <Box fontSize={'1.2em'} color={'fg.muted'}>
                        Upgrade to Pro to unlock all features and benefits
                     </Box>
                     <Button
                        variant={'solid'}
                        colorPalette={'blue'}
                        w={130}
                        mt={6}
                        onClick={() => setOpen(true)}
                     >
                        Upgrade to Pro
                     </Button>
                  </Card.Body>
               </Card.Root>
            </Box>
         </Section>
         <Upgrade open={open} onOpenChange={(e) => setOpen(e.open)} />
      </>
   );
}
