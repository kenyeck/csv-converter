import { Box, Link, Stack, Separator } from '@chakra-ui/react';

export const Footer = () => {
   return (
      <>
         <footer style={{ textAlign: 'center', marginTop: 'auto' }}>
            <Separator />
            <Box padding={'20px'}>
               <Stack direction="row" justifyContent="center" gap={10} mb={5}>
                  <Link href="/" fontWeight={'600'} textDecoration={'none'}>
                     Home
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
