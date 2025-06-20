'use client';

import { Stack, Box, Button } from "@chakra-ui/react";

export const ConvertHeader = () => {
   return (
      <Stack direction={'row'} justifyContent={'space-between'}>
         <Box fontSize={'1.25em'} fontWeight={'semibold'} mb={5}>
            Convert & Export
         </Box>
         <Button size={'sm'} variant={'outline'}>
            ^ Hide Code
         </Button>
      </Stack>
   );
};
