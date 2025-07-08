'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Box, Button, Stack, Tabs } from '@chakra-ui/react';
import { LuFileJson, LuCodeXml, LuDatabase, LuClipboard, LuDownload } from 'react-icons/lu';
import JsonView from 'react18-json-view';
import './json-view-style.css';
import XMLViewer from 'react-xml-viewer';
import { jsonToXML, jsonToSQL } from '@lib/Utils';
import { FileData } from '@models/file';
import { toaster, Toaster } from '../../chakra/Toaster';
import { SqlView } from './SqlView';

// Which json viewer to use?
// tried: react18-json-view, json-edit-react, react-json-view-lite, @textea/json-viewer
// json-edit-react, react-json-view-lite become, and @textea/json-viewer are too sluggish with large objects. using @textea/json-viewer for now
// 1st: react18-json-view
// 2nd: @textea/json-viewer

interface ConvertBodyProps {
   fileData: FileData;
   pageSize: number;
   hide: boolean;
}

export const ConvertBody = ({ fileData, pageSize, hide }: ConvertBodyProps) => {
   const { theme } = useTheme();
   const [activeTab, setActiveTab] = useState('json');

   const handleCopyToClipboard = () => {
      if (activeTab === 'json') {
         navigator.clipboard.writeText(JSON.stringify(fileData.json.slice(0, pageSize), null, 2));
      } else if (activeTab === 'xml') {
         navigator.clipboard.writeText(jsonToXML(fileData.json.slice(0, pageSize), 'root', 'row'));
      } else if (activeTab === 'sql') {
         navigator.clipboard.writeText(jsonToSQL(fileData.name, fileData.json.slice(0, pageSize)));
      }
      toaster.create({
         description: `${activeTab.toUpperCase()} contents copied to the clipboard.`,
         type: 'success',
         duration: 3000
      });
   };

   const handleDownload = async () => {
      const filename = fileData.name.substring(0, fileData.name.lastIndexOf('.'));
      let data = '';
      let type = '';
      let extension = '';
      if (activeTab === 'json') {
         data = JSON.stringify(fileData.json, null, 2);
         type = 'application/json';
         extension = 'json';
      } else if (activeTab === 'xml') {
         data = jsonToXML(fileData.json, 'root', 'row');
         type = 'application/xml';
         extension = 'xml';
      } else if (activeTab === 'sql') {
         data = jsonToSQL(fileData.name, fileData.json) || '';
         type = 'application/sql';
         extension = 'sql';
      }

      if ('showSaveFilePicker' in window) {
         try {
            // Define SaveFilePickerOptions type inline to avoid TS error
            type SaveFilePickerOptions = {
               suggestedName?: string;
               types?: Array<{
                  description?: string;
                  accept: Record<string, string[]>;
               }>;
               excludeAcceptAllOption?: boolean;
            };
            const handle = await (
               window as typeof window & {
                  showSaveFilePicker?: (_options?: SaveFilePickerOptions) => Promise<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
               }
            ).showSaveFilePicker!({
               suggestedName: `${filename}.${extension}`,
               types: [
                  {
                     description: `${extension.toUpperCase()} file`,
                     accept: { [type]: [`.${extension}`] }
                  }
               ]
            });
            const writable = await handle.createWritable();
            await writable.write(data);
            await writable.close();
         } catch (err) {
            // User cancelled or error occurred
            console.error('Save cancelled or failed', err);
         }
      }
   };

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
      <Stack direction={'column'} width={'100%'}>
         <Tabs.Root
            defaultValue="json"
            variant={'enclosed'}
            lazyMount={true}
            onValueChange={(details) => {
               setActiveTab(details.value);
            }}
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
            <Tabs.Content value="json" background={'bg'} display={`${hide ? 'none' : 'block'}`}>
               <Box
                  background={'bg.muted'}
                  border={`2px solid bg`}
                  borderRadius={'5px'}
                  paddingX={3}
                  paddingY={1}
                  overflowY={'scroll'}
                  height={'300px'}
                  fontSize={'14px'}
               >
                  <JsonView src={fileData.json.slice(0, pageSize)} dark={theme === 'dark'} />
               </Box>
            </Tabs.Content>
            <Tabs.Content value="xml" background={'bg'} display={`${hide ? 'none' : 'block'}`}>
               <Box
                  background={'bg.muted'}
                  border={`2px solid bg`}
                  borderRadius={'5px'}
                  paddingX={3}
                  paddingY={1}
                  overflowY={'scroll'}
                  height={'300px'}
                  fontSize={'14px'}
               >
                  <XMLViewer
                     xml={jsonToXML(fileData.json.slice(0, pageSize), 'root', 'row')}
                     indentSize={3}
                     invalidXml={<div>Invalid XML!</div>}
                  />
               </Box>
            </Tabs.Content>
            <Tabs.Content value="sql" background={'bg'} display={`${hide ? 'none' : 'block'}`}>
               <Box
                  background={'bg.muted'}
                  border={`2px solid bg`}
                  borderRadius={'5px'}
                  paddingX={3}
                  paddingY={1}
                  overflowY={'scroll'}
                  height={'300px'}
                  fontSize={'14px'}
               >
                  <SqlView
                     sqlString={jsonToSQL(fileData.name, fileData.json.slice(0, pageSize))}
                  />
               </Box>
            </Tabs.Content>
         </Tabs.Root>
         <Stack direction={'row'} justifyContent={'flex-end'} paddingTop={2} gap={4}>
            <Button
               size={'sm'}
               variant={'outline'}
               color={'fg.muted'}
               onClick={handleCopyToClipboard}
            >
               <LuClipboard />
               Copy to Clipboard
            </Button>
            <Button size={'sm'} variant={'solid'} color={'bg.muted'} onClick={handleDownload}>
               <LuDownload />
               {`Download ${activeTab.toUpperCase()}`}
            </Button>
         </Stack>
         <Toaster />
      </Stack>
   );
};
