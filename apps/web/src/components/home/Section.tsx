import { Box, BoxProps, Stack } from '@chakra-ui/react';

interface SectionProps extends BoxProps {
   id: string;
   title: string;
   subTitle?: string;
   children: React.ReactNode;
   py?: string | number;
   mb?: string | number;
}

export const Section: React.FC<SectionProps> = ({
   id,
   title,
   subTitle,
   children,
   py,
   mb = 20,
   ...rest
}: SectionProps) => {
   return (
      <Box id={id} w={'100%'} {...rest}>
         <Stack py={py} direction={'column'} alignItems={'center'}>
            <Stack
               mb={mb}
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
