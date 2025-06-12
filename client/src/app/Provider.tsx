'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import {
  ColorModeProvider,
  ColorModeProviderProps,
} from '@components/ui/color-mode';
import { AuthProvider } from '@components/AuthContext';

export function Provider(props: ColorModeProviderProps) {
  return (
    <AuthProvider>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider {...props} />
      </ChakraProvider>
    </AuthProvider>
  );
}
