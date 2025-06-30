'use client';

import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import { Box, Button, Card, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useColorMode } from '../../components/chakra/ColorModeButton';

const googleImg = '/images/google.svg';
const githubImg = '/images/github.svg';
const githubImgDark = '/images/github-dark.svg';

export default function SignInPage() {
   const [providers, setProviders] = useState<ClientSafeProvider[]>([]);
   const { colorMode } = useColorMode();
   const images = [
      { id: 'google', img: `${colorMode === 'dark' ? googleImg : googleImg}` },
      { id: 'github', img: `${colorMode === 'dark' ? githubImgDark : githubImg}` }
   ];

   useEffect(() => {
      const fetchProviders = async () => {
         const res = await getProviders();
         setProviders(res ? Object.values(res) : []);
      };
      fetchProviders();
   }, []);

   return providers.length > 0 ? (
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
                  Sign In
               </Box>
            </Card.Header>
            <Card.Body>Please sign in to continue.</Card.Body>
            <Card.Footer w={'100%'} pt={4} pb={8} py={4}>
               <Stack gap={3} direction="column" align="center" w={'100%'}>
                  {providers.map((provider) => (
                     <Button
                        variant={'outline'}
                        w={'90%'}
                        key={provider.name}
                        onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                     >
                        <Image
                           src={images.find((img) => img.id === provider.id)?.img || ''}
                           alt={`${provider.name} img`}
                           height={25}
                           width={25}
                           style={{ marginRight: '15px', display: 'inline-block' }}
                        />
                        Sign in with {provider.name}
                     </Button>
                  ))}
               </Stack>
            </Card.Footer>
         </Card.Root>
      </Box>
   ) : null;
}
