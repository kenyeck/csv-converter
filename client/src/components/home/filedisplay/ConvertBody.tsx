'use client';

import { useTheme } from 'next-themes';
import { Box, Tabs } from '@chakra-ui/react';
import { LuFileJson, LuCodeXml, LuDatabase } from 'react-icons/lu';
import { FileData } from 'types/file';
import JsonView from 'react18-json-view';
import './json-view-style.css';
import XMLViewer from 'react-xml-viewer';
import { jsonToXML } from '@lib/Utils';

// Which json viewer to use?
// tried: react18-json-view, json-edit-react, react-json-view-lite, @textea/json-viewer
// json-edit-react, react-json-view-lite become, and @textea/json-viewer are too sluggish with large objects. using @textea/json-viewer for now
// 1st: react18-json-view
// 2nd: @textea/json-viewer

interface ConvertBodyProps {
   fileData: FileData;
}

export const ConvertBody = ({ fileData }: ConvertBodyProps) => {
   const { theme } = useTheme();

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
      <Tabs.Root defaultValue="json" variant={'enclosed'} lazyMount={true}>
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
               border={`2px solid bg`}
               borderRadius={'5px'}
               paddingX={3}
               paddingY={1}
               overflowY={'scroll'}
               height={'300px'}
            >
               <JsonView src={fileData.json} dark={theme === 'dark'} />
            </Box>
         </Tabs.Content>
         <Tabs.Content value="xml" background={'bg'}>
            <Box
               background={'bg.muted'}
               border={`2px solid bg`}
               borderRadius={'5px'}
               paddingX={3}
               paddingY={1}
               overflowY={'scroll'}
               height={'300px'}
            >
               <XMLViewer
                  xml={jsonToXML(fileData.json, 'root', 'row')}
                  indentSize={3}
                  invalidXml={<div>Invalid XML!</div>}
               />
            </Box>
         </Tabs.Content>
         <Tabs.Content value="sql" background={'bg'}>
            <Box>SQL</Box>
         </Tabs.Content>
      </Tabs.Root>
   );
};
