'use client';

import { Box, Button, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { ColorModeButton } from './ui/color-mode';
import { useAuth } from './AuthContext';

export const Nav = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '100%',
          paddingTop: '10px',
          paddingRight: '10px',
        }}
      >
        {user ? (
          <Stack direction="row" alignItems="center" gap={5}>
            <Box fontWeight={'bold'}>Hi {user.firstName}!</Box>
            <Button onClick={logout} mr={'8px'}>
              Signout
            </Button>
          </Stack>
        ) : (
          <Button onClick={() => router.push('/signin')} mr={'8px'}>
            Signin
          </Button>
        )}
        <ColorModeButton />
      </nav>
      <Box mt={4}>{children}</Box>
    </>
  );
};
