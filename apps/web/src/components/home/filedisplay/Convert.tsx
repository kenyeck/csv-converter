'use client';

import { useState } from 'react';
import { Stack } from '@chakra-ui/react';
import { ConvertBody } from './ConvertBody';
import { ConvertHeader } from './ConvertHeader';
import { FileData } from '@models/file';

interface ConvertProps {
   fileData: FileData;
   pageSize: number;
}

export const Convert = ({ fileData, pageSize }: ConvertProps) => {
   const [hide, setHide] = useState(false);
   const handleToggle = () => {
      setHide(!hide);
   };
   return (
      <Stack direction={'column'}>
         <ConvertHeader hide={hide} onToggle={handleToggle} />
         <ConvertBody fileData={fileData} pageSize={pageSize} hide={hide} />
      </Stack>
   );
};
