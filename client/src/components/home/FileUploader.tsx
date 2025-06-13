'use client';

import React from 'react';
import { useState } from 'react';
//import axios from 'axios';
//import { parseCSV } from '@lib/Utils';
import { LuUpload, LuFileSpreadsheet } from 'react-icons/lu';
import { FileChangeDetails } from '@chakra-ui/react/dist/types/components/file-upload/namespace';
import { Button, FileUpload, Icon, Box, BoxProps, Card } from '@chakra-ui/react';
import { ProcessedData } from 'types/file';

interface FileDetails extends FileChangeDetails {
   acceptedFiles: File[];
}

export const FileUploader: React.FC<BoxProps> = (props) => {
   const [_processedData, _setProcessedData] = useState<ProcessedData | null>(null);

   const uploadFile = (details: FileDetails) => {
      console.log('File change details:', details);
   };

   // const handleUpload = async () => {
   //   if (!file) {
   //     //toaster.Create({ description: 'No file selected', type: 'error' });
   //     return;
   //   }

   //   const formData = new FormData();
   //   formData.append('file', file);

   //   try {
   //     const response = await axios.post(
   //       'http://localhost:3001/api/upload',
   //       formData
   //     );
   //     setProcessedData(response.data);
   //     //toaster.Create({ description: 'File processed successfully', type: 'success' });
   //   } catch (_error) {
   //     //toaster.Create({ description: 'Error processing file', type: 'error' });
   //   }
   // };

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
      <Card.Root maxW="xxl" w={'100%'} variant={'elevated'} {...props}>
         <Card.Body>
            <Box fontSize={'1.25em'} fontWeight={'semibold'}>Upload your file</Box>
            <Box fontSize={'1em'} color={'fg.muted'} mb={5}>Drag and droop or click to select a file to convert</Box>
            <FileUpload.Root
               maxW="xxl"
               alignItems="stretch"
               maxFiles={1}
               accept={'.csv,.xlsx'}
               onFileAccept={uploadFile}
            >
               <FileUpload.HiddenInput />
               <FileUpload.Dropzone borderRadius={'15px'} >
                  <Box padding={5} margin={3} mt={5} background={'bg.muted'} borderRadius={'50%'}>
                     <Icon fontSize={'2.5em'}>
                        <LuFileSpreadsheet />
                     </Icon>
                  </Box>
                  <FileUpload.DropzoneContent cursor={'pointer'} borderRadius={'lg'}>
                     <Box fontSize={'1.5em'} fontWeight={'semibold'}>
                        Drag & drop your file here
                     </Box>
                     <Box
                        fontSize={'1.1em'}
                        color="fg.muted"
                        maxW={'350px'}
                        mt={3}
                     >{`Supports CSV, Excel (XLSX/XLS), TSV and text files with international characters`}</Box>
                     <Button variant="outline" size="md" my={10}>
                        <LuUpload /> Upload file
                     </Button>
                  </FileUpload.DropzoneContent>
               </FileUpload.Dropzone>
            </FileUpload.Root>
         </Card.Body>
      </Card.Root>
   );
};
