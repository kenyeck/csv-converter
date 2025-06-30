import { Box, Stack, Separator } from '@chakra-ui/react';
import Link from 'next/link';

export const Footer = () => {
   return (
      <Box as="footer" textAlign={'center'} paddingLeft={'50px'} paddingRight={'50px'} background={'bg'} >
         <Separator />
         <Box padding={'20px'}>
            <Stack direction="row" justifyContent="center" gap={10} mb={5}>
               <FooterLinks href="/" name="Home" />
               <FooterLinks href="/#features" name="Features" />
               <FooterLinks href="/#pricing" name="Pricing" />
               <FooterLinks href="/disclosures/privacy" name="Privacy Policy" />
            </Stack>
            <Box fontSize={'1.25em'} fontWeight={'bold'}>
               CSVConvert
            </Box>
            <Box fontSize={'.85em'} color={'fg.muted'} mt={5}>
               © {new Date().getFullYear()} CSVConvert. All rights reserved.
            </Box>
         </Box>
      </Box>
   );
};

interface FooterLinksProps {
   href: string;
   name: string;
}

function FooterLinks({ href, name }: FooterLinksProps) {
   return (
      <Link href={href} style={{ fontWeight: '600', textDecoration: 'none' }}>
         {name}
      </Link>
   );
}
