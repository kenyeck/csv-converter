import { Box } from '@chakra-ui/react';
import { Providers } from '../components/providers/Providers';
import { Nav } from '@components/layout/Nav';
import { Footer } from '@components/layout/Footer';
import { getServerSession } from 'next-auth';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
   const session = await getServerSession();

   // Note hydration warning is suppressed due to ThemeToggle component
   return (
      <html lang="en" suppressHydrationWarning>
         <body>
            <Providers session={session!}>
               <Box
                  as="main"
                  minH={'100dvh'}
                  display={'flex'}
                  flexDir={'column'}
                  maxW={'1170px'}
                  margin={'0 auto'}
                  padding={'0 1em'}
               >
                  <Nav />
                  {children}
                  <Footer />
               </Box>
            </Providers>
         </body>
      </html>
   );
}
