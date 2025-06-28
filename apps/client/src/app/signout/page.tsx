'use client';

import { Box, Button, Card } from '@chakra-ui/react/';
import { signOut } from 'next-auth/react';

export default function SignOutPage() {
   return (
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={20}>
         <Card.Root
            size={'sm'}
            variant={'elevated'}
            alignItems={'center'}
            w={'300px'}
            border={'1px solid bg.muted'}
         >
            <Card.Header>
               <Box as="h1" fontWeight={'bold'} fontSize={'lg'}>
                  Sign Out
               </Box>
            </Card.Header>
            <Card.Body>Are you sure you want to sign out?</Card.Body>
            <Card.Footer w={'100%'} pt={4} pb={8} px={8}>
               <Button variant={'solid'} colorPalette={'blue'} w={'100%'} onClick={() => signOut({ callbackUrl: '/' })}>
                  Sign out
               </Button>
            </Card.Footer>
         </Card.Root>
      </Box>
   );
}
