'use client';

import { ChakraProvider } from '@chakra-ui/react';
import SessionProvider from '@components/providers/SessionProvider';
import { ColorModeProvider, ColorModeProviderProps } from '@components/chakra/ColorModeButton';
import { Session } from 'next-auth';
import { system } from 'common/styles/theme';

interface ProvidersProps extends ColorModeProviderProps {
   session?: Session;
}

export function Providers(props: ProvidersProps) {
   const { session, ...rest } = props;
   return (
      <SessionProvider session={session}>
         <ChakraProvider value={system}>
            <ColorModeProvider {...rest} />
         </ChakraProvider>
      </SessionProvider>
   );
}
