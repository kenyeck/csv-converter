'use client';

import { ChakraProvider } from '@chakra-ui/react';
import SessionProvider from './SessionProvider';
import { ColorModeProvider, ColorModeProviderProps } from '../chakra/ColorModeButton';
import { system } from '../../common/styles/theme';

export function Providers(props: ColorModeProviderProps) {
   return (
      <SessionProvider>
         <ChakraProvider value={system}>
            <ColorModeProvider {...props} />
         </ChakraProvider>
      </SessionProvider>
   );
}
