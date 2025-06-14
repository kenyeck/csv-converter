import { Box, Tabs, Stack, Separator } from '@chakra-ui/react';
import { LuFileJson, LuTable } from 'react-icons/lu';
import { PreviewHeader } from './PreviewHeader';
import { PreviewTable } from './PreviewTable';

export const ViewConvert = () => {
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
               <Stack direction={'column'}>
                  <PreviewHeader />
                  <PreviewTable />
               </Stack>
            </Tabs.Content>
            <Tabs.Content value="convert" background={'bg'}>
               <Box>***Convert***</Box>
            </Tabs.Content>
         </Tabs.Root>
      </Box>
   );
};
