import { Stack } from '@chakra-ui/react';
import { ConvertBody } from './ConvertBody';
import { ConvertHeader } from './ConvertHeader';
import { FileData } from 'types/file';

interface ConvertProps {
   fileData: FileData;
}

export const Convert = ({ fileData }: ConvertProps) => {
   return (
      <Stack direction={'column'}>
         <ConvertHeader />
         <ConvertBody fileData={fileData} />
      </Stack>
   );
};
