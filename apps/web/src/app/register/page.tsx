'use client';

import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import { Box, Button, Card, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useColorMode } from '@components/chakra/ColorModeButton';

const googleImg = '/images/google.svg';
const githubImg = '/images/github.svg';
const githubImgDark = '/images/github-dark.svg';

export default function RegisterPage() {
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
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={150}>
         <Card.Root
            size={'sm'}
            variant={'elevated'}
            alignItems={'center'}
            w={'400px'}
            border={'1px solid lightgray'}
         >
            <Card.Header>
               <Box fontSize={'2em'} fontWeight={'bold'}>
                  Sign Up
               </Box>
            </Card.Header>
            <Card.Body w={'100%'} my={8}>
               <Stack gap={4} direction="column" align="center" w={'100%'}>
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
            </Card.Body>
         </Card.Root>
      </Box>
   ) : null;
}
