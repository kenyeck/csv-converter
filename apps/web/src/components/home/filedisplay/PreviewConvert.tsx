'use client';

import { Box, Tabs, Separator } from '@chakra-ui/react';
import { LuFileJson, LuTable } from 'react-icons/lu';
import { Preview } from './Preview';
import { Convert } from './Convert';
import { useState } from 'react';
import { FileData } from '@models/file';

export const defaultPageSize = 10;

interface ViewConvertProps {
   fileData: FileData;
}

export const PreviewConvert = ({ fileData: fd }: ViewConvertProps) => {
   const [fileData, _setFileData] = useState<FileData>(fd);
   const [pageSize, setPageSize] = useState(defaultPageSize);

   return (
      <Box w={'100%'}>
         <Tabs.Root
            defaultValue="preview"
            variant={'enclosed'}
            mt={4}
            width={'full'}
            background={'bg.muted'}
            lazyMount={true}
         >
            <Tabs.List>
               <Tabs.Trigger value="preview" style={{ height: '2.25em' }}>
                  <LuTable />
                  <Box>Preview</Box>
               </Tabs.Trigger>
               <Tabs.Trigger value="convert" style={{ height: '2.25em' }}>
                  <LuFileJson />
                  <Box>Convert</Box>
               </Tabs.Trigger>
            </Tabs.List>
            <Separator />
            <Tabs.Content value="preview" background={'bg'}>
               <Preview fileData={fileData} pageSize={pageSize} setPageSize={setPageSize} />
            </Tabs.Content>
            <Tabs.Content value="convert" background={'bg'}>
               <Convert fileData={fileData} pageSize={pageSize} />
            </Tabs.Content>
         </Tabs.Root>
      </Box>
   );
};
