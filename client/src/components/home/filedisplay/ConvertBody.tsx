import { Box, Tabs } from '@chakra-ui/react';
import { LuFileJson, LuCodeXml, LuDatabase } from 'react-icons/lu';

export const ConvertBody = () => {
   return (
         <Tabs.Root
            defaultValue="json"
            variant={'enclosed'}
            //mt={4}
            //width={'full'}
            //background={'bg.muted'}
         >
            <Tabs.List>
               <Tabs.Trigger value="json" style={{ height: '2.25em', width: '125px' }}>
                  <LuFileJson />
                  <Box>JSON</Box>
               </Tabs.Trigger>
               <Tabs.Trigger value="xml" style={{ height: '2.25em', width: '125px' }}>
                  <LuCodeXml />
                  <Box>XML</Box>
               </Tabs.Trigger>
               <Tabs.Trigger value="sql" style={{ height: '2.25em', width: '125px' }}>
                  <LuDatabase />
                  <Box>SQL</Box>
               </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="json" background={'bg'}>
               <Box>JSON</Box>
            </Tabs.Content>
            <Tabs.Content value="xml" background={'bg'}>
               <Box>XML</Box>
            </Tabs.Content>
            <Tabs.Content value="sql" background={'bg'}>
               <Box>SQL</Box>
            </Tabs.Content>
         </Tabs.Root>
   );
};
