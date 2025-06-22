import { Box, Stack } from '@chakra-ui/react';

interface SectionProps {
   title: string;
   subTitle: string;
   children: React.ReactNode;
   py?: string | number;
}

export const Section = ({ title, subTitle, children, py }: SectionProps) => {
   return (
      <Box w={'100%'}>
         <Stack py={py} direction={'column'} alignItems={'center'}>
            <Stack
               mb={20}
               direction={'column'}
               alignItems={'center'}
               maxW={'65%'}
               gap={4}
               w={'100%'}
            >
               <Box fontSize={'3em'} fontWeight={'bold'} lineHeight={'1em'} textAlign={'center'}>
                  {title}
               </Box>
               <Box fontSize={'1.25em'} textAlign={'center'}>
                  {subTitle}
               </Box>
            </Stack>

            {children}
         </Stack>
      </Box>
   );
};
