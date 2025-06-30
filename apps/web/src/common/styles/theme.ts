// theme.ts
import { createSystem, defaultConfig } from '@chakra-ui/react';

export const system = createSystem(defaultConfig, {
   globalCss: {
      'html, body': {
         margin: 0,
         padding: 0,
         fontSize: '16px',
         scrollBehavior: 'smooth',
         display: 'flex',
         flexDirection: 'column',
         height: '100vh',
         width: '100%',
         colorPalette: 'blue'
      }
   },
   theme: {
      semanticTokens: {
         colors: {
            blue: {
               solid: {
                  value: { _light: '{colors.blue.600/90}', _dark: '#0284c7' } // Custom dark blue
               },
               muted: {
                  value: { _light: '{colors.blue.100/90}', _dark: '#082f49' } // Custom dark muted blue
               }
            }
         }
      }
   },
   strictTokens: true
});
