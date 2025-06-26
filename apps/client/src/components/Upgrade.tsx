'use client';

import { Dialog, Box, List, Button, Stack, CloseButton } from '@chakra-ui/react';
import { LuCircleCheck, LuLightbulb } from 'react-icons/lu';

interface UpgradeProps {
   open?: boolean;
   onOpenChange?: (_e: { open: boolean }) => void;
}

export function Upgrade({ open, onOpenChange }: UpgradeProps) {
   const planName = 'Pro';
   const planDescription = 'Unlock all Pro features for just $14.99/month';
   const planBenefits = [
      'Import Excel (XLS, XLSX) files',
      'Unlimited row preview',
      'Advanced filtering and sorting',
      'Header renaming and configuring',
      'Column splitting and combining',
      'Find and replace with regex support',
      'Full JSON and XML export with formatting',
      'Efficient large file handling',
      'Unlimited file conversions'
   ];

   return (
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
                        {planName}
                     </span>
                  </Dialog.Title>
               </Dialog.Header>
               <Dialog.Body>
                  <Stack alignItems={'center'} mb={6}>
                     <Box color={'fg.muted'} w={'fit-content'}>
                        {planDescription}
                     </Box>
                  </Stack>
                  <List.Root gap="2" variant="plain" align="center">
                     {planBenefits.map((benefit, index) => (
                        <List.Item key={index}>
                           <List.Indicator asChild color="blue" fontSize={'1.5em'}>
                              <LuCircleCheck />
                           </List.Indicator>
                           {benefit}
                        </List.Item>
                     ))}
                  </List.Root>
               </Dialog.Body>
               <Dialog.Footer>
                  <Button variant={'solid'} colorPalette={'blue'} w={'100%'}>
                     <LuLightbulb /> Upgrade to Pro
                  </Button>
               </Dialog.Footer>
               <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
               </Dialog.CloseTrigger>{' '}
            </Dialog.Content>
         </Dialog.Positioner>
      </Dialog.Root>
      // <div>
      //    <h2>Upgrade to Pro</h2>
      //    <p>Unlock all features and benefits by upgrading to Pro.</p>
      //    <button onClick={() => setOpen(true)}>Upgrade Now</button>

      //    {open && (
      //       <div className="upgrade-dialog">
      //          <h3>Upgrade to Pro</h3>
      //          <p>Choose your plan:</p>
      //          <button onClick={() => alert('Upgraded to Pro!')}>Pro Plan</button>
      //          <button onClick={() => setOpen(false)}>Cancel</button>
      //       </div>
      //    )}
      // </div>
   );
}
