'use client';

import { Stack } from '@chakra-ui/react';
import { ConvertBody } from './ConvertBody';
import { ConvertHeader } from './ConvertHeader';
import { FileData } from 'types/file';
import { useState } from 'react';

interface ConvertProps {
   fileData: FileData;
}

export const Convert = ({ fileData }: ConvertProps) => {
   const [hide, setHide] = useState(false);
   const handleToggle = () => {
      setHide(!hide);
   };
   return (
      <Stack direction={'column'}>
         <ConvertHeader hide={hide} onToggle={handleToggle} />
         <ConvertBody fileData={fileData} hide={hide} />
      </Stack>
   );
};
