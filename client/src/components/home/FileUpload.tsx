/* eslint-disable @typescript-eslint/no-explicit-any */
// todo: disble for now - need to figure out how to get types for Chakra components, eg. FileUpload.Dropzone
'use client';

import React from 'react';
import { useState } from 'react';
//import axios from 'axios';
//import { parseCSV } from '@lib/Utils';
import { LuUpload, LuFileSpreadsheet } from 'react-icons/lu';
import { Button, FileUpload as ChFileUpload, Icon, Box, BoxProps, Card } from '@chakra-ui/react';
import { ProcessedData } from 'types/file';

interface FileAcceptDetails {
   files: File[];
}

interface FileUploadProps extends BoxProps {
   onUpload: (file: File) => void; // eslint-disable-line no-unused-vars
}

export const FileUpload: React.FC<FileUploadProps> = (props: FileUploadProps) => {
   const [_processedData, _setProcessedData] = useState<ProcessedData | null>(null);

   const onFileAccept = (details: FileAcceptDetails) => {
      props.onUpload(details.files[0]);
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
      <Box height={'100vh'} w={'100%'}>
         <Card.Root maxW="xxl" variant={'elevated'}>
            <Card.Body>
               <Box fontSize={'1.25em'} fontWeight={'semibold'}>
                  Upload your file
               </Box>
               <Box fontSize={'1em'} color={'fg.muted'} mb={5}>
                  Drag and droop or click to select a file to convert
               </Box>
               <ChFileUpload.Root
                  maxW="xxl"
                  alignItems="stretch"
                  maxFiles={1}
                  accept={'.csv,.xlsx'}
                  onFileAccept={onFileAccept}
               >
                  <ChFileUpload.HiddenInput />
                  <ChFileUpload.Dropzone {...({ borderRadius: '15px' } as any)}> 
                     <Box
                        padding={5}
                        margin={3}
                        mt={5}
                        background={'bg.muted'}
                        borderRadius={'50%'}
                     >
                        <Icon fontSize={'2.5em'}>
                           <LuFileSpreadsheet />
                        </Icon>
                     </Box>
                     <ChFileUpload.DropzoneContent cursor={'pointer'} borderRadius={'lg'}>
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
                     </ChFileUpload.DropzoneContent>
                  </ChFileUpload.Dropzone>
               </ChFileUpload.Root>
            </Card.Body>
         </Card.Root>
      </Box>
   );
};
