'use client';

import { VStack, Heading, Box, Separator } from '@chakra-ui/react';
import { FileUploader } from '@components/home/FileUploader';

export const Home = () => {
   return (
      <VStack p={8} alignItems={'center'}>
         <Heading mb={6}>CSV Convert</Heading>
         <FileUploader height={'100vh'} />
         <Separator colorPalette={'black'} />
         <Box
            height={'300px'}
            w={'100%'}
            textAlign={'center'}
            pt={'75px'}
         >
            MARKETING SECTION
         </Box>
         <Separator />
         <Box
            height={'300px'}
            w={'100%'}
            textAlign={'center'}
            pt={'75px'}
         >
            PRICING SECTION
         </Box>
      </VStack>
   );
};
