'use client';

import { ChakraProvider, createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
import SessionProvider from '@components/providers/SessionProvider';
import { ColorModeProvider, ColorModeProviderProps } from '@components/chakra/ColorModeButton';
import { Session } from 'next-auth';

const config = defineConfig({
   globalCss: {
      'html, body': {
         margin: 0,
         padding: 0,
         fontSize: '16px',
         scrollBehavior: 'smooth',
         backgroundColor: 'bg.subtle',
         color: 'fg.default',
         display: 'flex',
         flexDirection: 'column',
         height: '100vh',
         width: '100%',
      }
   },
   theme: {
      tokens: {
         colors: {}
      }
   },
   strictTokens: true
});

const system = createSystem(defaultConfig, config);

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
