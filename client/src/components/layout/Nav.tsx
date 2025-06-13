'use client';

import { Box, Button, Stack } from '@chakra-ui/react';
import { ColorModeButton } from '../ui/color-mode';
import { useAuth } from '../AuthContext';
import Link from 'next/link';

export const Nav = () => {
   const { user, logout } = useAuth();

   return (
      <nav
         style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '10px'
         }}
      >
         <Link
            href="https://csvconvert.com"
            style={{
               textDecoration: 'none',
               color: 'inherit',
               fontSize: '1.5em',
               fontWeight: 'bold'
            }}
         >
            CSVConvert
         </Link>
         <Stack direction={'row'} justifyContent={'flex-end'} alignItems={'center'}>
            {user ? (
               <Stack direction="row" alignItems="center" gap={5}>
                  <Box fontWeight={'bold'}>Hi {user.firstName}!</Box>
                  <Button onClick={logout} mr={'8px'}>
                     Signout
                  </Button>
               </Stack>
            ) : (
               <Button mr={'8px'}>
                  <Link href="/signin" style={{ textDecoration: 'none', color: 'inherit' }}>
                     Signin
                  </Link>
               </Button>
            )}
            <ColorModeButton />
         </Stack>
      </nav>
   );
};
