'use client';

import { ChakraProvider, createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
import { ColorModeProvider, ColorModeProviderProps } from '@components/ui/color-mode';
import { AuthProvider } from '@components/AuthContext';

const config = defineConfig({
   theme: {
      tokens: {
         colors: {}
      }
   },
   strictTokens: true
});

const system = createSystem(defaultConfig, config);

export function Provider(props: ColorModeProviderProps) {
   return (
      <AuthProvider>
         <ChakraProvider value={system}>
            <ColorModeProvider {...props} />
         </ChakraProvider>
      </AuthProvider>
   );
}
