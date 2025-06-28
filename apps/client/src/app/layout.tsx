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
         <Providers session={session!}>
            <body
               style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100vh',
                  width: '100%',
                  margin: 0,
                  padding: 0
               }}
            >
               <Nav />
               <Box flex={'1'} background={'bg.subtle'} padding={'20px'}>
                  {children}
               </Box>
               <Footer />
            </body>
         </Providers>
      </html>
   );
}
