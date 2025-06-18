import { Stack } from '@chakra-ui/react';
import { ConvertBody } from './ConvertBody';
import { ConvertHeader } from './ConvertHeader';

export const Convert = () => {
   return (
      <Stack direction={'column'}>
         <ConvertHeader />
         <ConvertBody />
      </Stack>
   );
};
