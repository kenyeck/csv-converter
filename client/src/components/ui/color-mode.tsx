'use client';

import * as React from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';
import { ThemeProvider, useTheme } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';
import type { IconButtonProps, SpanProps } from '@chakra-ui/react';
import { ClientOnly, IconButton, Menu, Portal, Skeleton, Span } from '@chakra-ui/react';

export interface ColorModeProviderProps extends ThemeProviderProps {} // eslint-disable-line @typescript-eslint/no-empty-object-type

export function ColorModeProvider(props: ColorModeProviderProps) {
   return <ThemeProvider attribute="class" disableTransitionOnChange {...props} />;
}

export type ColorMode = 'light' | 'dark' | 'system';

export interface UseColorModeReturn {
   colorMode: ColorMode;
   setColorMode: (colorMode: ColorMode) => void; // eslint-disable-line no-unused-vars
   toggleColorMode: () => void;
}

export function useColorMode(): UseColorModeReturn {
   const { resolvedTheme, setTheme, forcedTheme } = useTheme();
   const colorMode = forcedTheme || resolvedTheme;
   const toggleColorMode = () => {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
   };
   return {
      colorMode: colorMode as ColorMode,
      setColorMode: setTheme,
      toggleColorMode
   };
}

export function useColorModeValue<T>(light: T, dark: T) {
   const { colorMode } = useColorMode();
   return colorMode === 'dark' ? dark : light;
}

export function ColorModeIcon() {
   const { colorMode } = useColorMode();
   return colorMode === 'dark' ? <LuMoon /> : <LuSun />;
}

interface ColorModeButtonProps extends Omit<IconButtonProps, 'aria-label'> {} // eslint-disable-line @typescript-eslint/no-empty-object-type

interface SelectionDetails {
    value: string;
}

export const ColorModeButton = React.forwardRef<HTMLButtonElement, ColorModeButtonProps>(
   function ColorModeButton(props, ref) {
      const { setColorMode } = useColorMode();

      const onMenu = (details: SelectionDetails) => {
         setColorMode(details.value as ColorMode);
      };

      return (
         <ClientOnly fallback={<Skeleton boxSize="8" />}>
            <Menu.Root onSelect={onMenu}>
               <Menu.Trigger>
                  <IconButton
                     variant="outline"
                     aria-label="Toggle color mode"
                     size="sm"
                     ref={ref}
                     {...props}
                     css={{
                        _icon: {
                           width: '5',
                           height: '5'
                        }
                     }}
                  >
                     <ColorModeIcon />
                  </IconButton>
               </Menu.Trigger>
               <Portal>
                  <Menu.Positioner>
                     <Menu.Content>
                        <Menu.Item value="light">Light</Menu.Item>
                        <Menu.Item value="dark">Dark</Menu.Item>
                        <Menu.Item value="system">System</Menu.Item>
                     </Menu.Content>
                  </Menu.Positioner>
               </Portal>
            </Menu.Root>
         </ClientOnly>
      );
   }
);

export const LightMode = React.forwardRef<HTMLSpanElement, SpanProps>(
   function LightMode(props, ref) {
      return (
         <Span
            color="fg"
            display="contents"
            className="chakra-theme light"
            colorPalette="gray"
            colorScheme="light"
            ref={ref}
            {...props}
         />
      );
   }
);

export const DarkMode = React.forwardRef<HTMLSpanElement, SpanProps>(function DarkMode(props, ref) {
   return (
      <Span
         color="fg"
         display="contents"
         className="chakra-theme dark"
         colorPalette="gray"
         colorScheme="dark"
         ref={ref}
         {...props}
      />
   );
});
