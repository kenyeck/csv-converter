'use client';

import { Dialog, Box, List, Button, Stack, CloseButton } from '@chakra-ui/react';
import { LuCircleCheck, LuZap } from 'react-icons/lu';
import { Plan } from 'types/plan';

interface UpgradeProps {
   open?: boolean;
   onOpenChange?: (_e: { open: boolean }) => void;
   plan?: Plan;
}

export function Upgrade({ open, onOpenChange, plan }: UpgradeProps) {

   return (plan ? (
      <Dialog.Root size={'xs'} lazyMount open={open} onOpenChange={onOpenChange}>
         <Dialog.Trigger />
         <Dialog.Backdrop bg={'blackAlpha.800'} />
         <Dialog.Positioner>
            <Dialog.Content>
               <Dialog.CloseTrigger />
               <Dialog.Header justifyContent={'center'}>
                  <Dialog.Title>
                     Upgrade to{' '}
                     <span
                        style={{
                           color: 'white',
                           background: 'blue',
                           borderRadius: '25px',
                           marginLeft: '2px',
                           paddingLeft: '8px',
                           paddingRight: '8px',
                           paddingBottom: '2px'
                        }}
                     >
                        {plan.name}
                     </span>
                  </Dialog.Title>
               </Dialog.Header>
               <Dialog.Body>
                  <Stack alignItems={'center'} mb={6}>
                     <Box color={'fg.muted'} w={'fit-content'}>
                        {plan.description}
                     </Box>
                  </Stack>
                  <List.Root gap="2" variant="plain" align="center">
                     {plan.features.map((feature, index) => (
                        <List.Item key={index}>
                           <List.Indicator asChild color="blue" fontSize={'1.5em'}>
                              <LuCircleCheck />
                           </List.Indicator>
                           {feature}
                        </List.Item>
                     ))}
                  </List.Root>
               </Dialog.Body>
               <Dialog.Footer>
                  <Button variant={'solid'} w={'100%'}>
                     <LuZap /> Upgrade to Pro
                  </Button>
               </Dialog.Footer>
               <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
               </Dialog.CloseTrigger>{' '}
            </Dialog.Content>
         </Dialog.Positioner>
      </Dialog.Root>) : null
   );
}
