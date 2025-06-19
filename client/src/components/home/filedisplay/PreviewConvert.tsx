import { Box, Tabs, Separator } from '@chakra-ui/react';
import { LuFileJson, LuTable } from 'react-icons/lu';
import { FileData } from 'types/file';
import { Preview } from './Preview';
import { Convert } from './Convert';

interface ViewConvertProps {
   fileData: FileData;
}

export const PreviewConvert = ({ fileData }: ViewConvertProps) => {
   return (
      <Box w={'100%'}>
         <Tabs.Root
            defaultValue="preview"
            variant={'enclosed'}
            mt={4}
            width={'full'}
            background={'bg.muted'}
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
               <Preview fileData={fileData} />
            </Tabs.Content>
            <Tabs.Content value="convert" background={'bg'}>
               <Convert fileData={fileData} />
            </Tabs.Content>
         </Tabs.Root>
      </Box>
   );
};
