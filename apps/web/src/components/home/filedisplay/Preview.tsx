'use client';

import { useEffect, useState } from 'react';
import { Stack } from '@chakra-ui/react';
import { PreviewHeader } from './PreviewHeader';
import { PreviewTable } from './PreviewTable';
import { FileData } from '@models/file';
import { ColumnState, SortDirection } from './EditHeader';

interface PreviewProps {
   fileData: FileData;
   pageSize: number;
   setPageSize: (pageSize: number) => void;
}

export const Preview = ({ fileData, pageSize, setPageSize }: PreviewProps) => {
   const [cols, setCols] = useState<ColumnState[]>([]);

   useEffect(() => {
      if (fileData.json.length > 0) {
         const keys = Object.keys(fileData.json[0]);
         setCols(
            keys.map((key) => ({
               name: key,
               enabled: true,
               sampleData: fileData.json[0][key],
               dataType: typeof fileData.json[0][key],
               sortDirection: SortDirection.none
            }))
         );
      }
   }, [fileData.json]);

   return (
      <Stack direction={'column'}>
         <PreviewHeader cols={cols} setPageSize={setPageSize} />
         <PreviewTable cols={cols} fileData={fileData} pageSize={pageSize} />
      </Stack>
   );
};
