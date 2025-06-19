import { Box, Tabs } from '@chakra-ui/react';
import { LuFileJson, LuCodeXml, LuDatabase } from 'react-icons/lu';
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { FileData } from 'types/file';

interface ConvertBodyProps {
   fileData: FileData;
}

export const ConvertBody = ({ fileData }: ConvertBodyProps) => {

   // const handleDownload = async (format: 'json' | 'xml' | 'csv') => {
   //   if (!processedData) return;

   //   try {
   //     const response = await axios.post(
   //       'http://localhost:3001/api/download',
   //       { data: processedData, format },
   //       {
   //         responseType: 'blob',
   //       }
   //     );

   //     const url = window.URL.createObjectURL(new Blob([response.data]));
   //     const link = document.createElement('a');
   //     link.href = url;
   //     link.setAttribute('download', `processed.${format}`);
   //     document.body.appendChild(link);
   //     link.click();
   //     document.body.removeChild(link);
   //   } catch (_error) {
   //     //toaster.Create({ description: `Error downloading ${format.toUpperCase()}`, type: 'error' });
   //   }
   // };

   return (
      <Tabs.Root defaultValue="json" variant={'enclosed'}>
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
            <Box
               background={'bg.muted'}
               paddingX={3}
               paddingY={1}
               overflowY={'scroll'}
               maxH={'300px'}
            >
               <JsonView
                  data={fileData.json}
                  shouldExpandNode={allExpanded}
                  style={defaultStyles}
               />
            </Box>
         </Tabs.Content>
         <Tabs.Content value="xml" background={'bg'}>
            <Box>XML</Box>
         </Tabs.Content>
         <Tabs.Content value="sql" background={'bg'}>
            <Box>SQL</Box>)
         </Tabs.Content>
      </Tabs.Root>
   );
};
