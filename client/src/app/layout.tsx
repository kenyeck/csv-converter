import { Box } from '@chakra-ui/react';
import { Provider } from './Provider';
import { Nav } from '@components/layout/Nav';
import { Footer } from '@components/layout/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
   // Note hydration warning is suppressed due to ThemeToggle component
   return (
      <html lang="en" suppressHydrationWarning>
         <body>
            <Provider>
               <Box minH={'100dvh'} display={'flex'} flexDir={'column'} maxW={'1170px'} margin={'0 auto'} padding={'0 1em'}>
                  <Nav />
                  {children}
                  <Footer />
               </Box>
            </Provider>
         </body>
      </html>
   );
}
