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
               <Nav />
               <Box
                  as="main"
                  flex={'1'}
                  marginTop={'60px'}
                  marginBottom={'60px'}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'flex-start'}
               >
                  <Box maxWidth={'1200px'} width={'100%'} padding={'0 20px'} boxSizing={'border-box'}>
                     {children}
                  </Box>
               </Box>
               <Footer />
            </Providers>
         </body>
      </html>
   );
}
