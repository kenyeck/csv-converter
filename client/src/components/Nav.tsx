'use client';

import { Box, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { ColorModeButton } from './ui/color-mode';

export const Nav = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const onLogin = () => {
    router.push('/login');
  };

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
        <Button onClick={onLogin} mr={'8px'}>Login</Button>
        <ColorModeButton />
      </nav>
      <Box mt={4}>{children}</Box>
    </>
  );
};
