import { Box, Stack, Separator } from '@chakra-ui/react';
import Link from 'next/link';

export const Footer = () => {
   return (
      <>
         <footer style={{ textAlign: 'center', marginTop: 'auto' }}>
            <Separator />
            <Box padding={'20px'}>
               <Stack direction="row" justifyContent="center" gap={10} mb={5}>
                  <Link href="/" style={{ fontWeight: '600', textDecoration: 'none' }}>
                     Home
                  </Link>
                  <Link href="/disclosures/privacy" style={{ fontWeight: '600', textDecoration: 'none' }}>
                     Privacy Policy
                  </Link>
               </Stack>
               <Box fontSize={'1.25em'} fontWeight={'bold'}>
                  CSVConvert
               </Box>
               <Box fontSize={'.85em'} color={'fg.muted'} mt={5}>
                  © {new Date().getFullYear()} CSVConvert. All rights reserved.
               </Box>
            </Box>
         </footer>
      </>
   );
};
