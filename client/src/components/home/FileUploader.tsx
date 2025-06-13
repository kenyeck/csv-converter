import { useState } from 'react';
//import axios from 'axios';
//import { parseCSV } from '@lib/Utils';
import {
   Button,
   VStack,
   FileUpload,
   FileUploadList,
   Icon,
   Box,
   HStack,
   BoxProps
} from '@chakra-ui/react';
import { ProcessedData } from 'types/file';
import { LuFileUp, LuUpload } from 'react-icons/lu';
import { FileChangeDetails } from '@chakra-ui/react/dist/types/components/file-upload/namespace';
import React from 'react';

const maxFiles = 5;

interface FileDetails extends FileChangeDetails {
   acceptedFiles: File[];
}

export const FileUploader: React.FC<BoxProps> = (props) => {
   const [files, setFiles] = useState<File[]>([]);
   const [_processedData, _setProcessedData] = useState<ProcessedData | null>(null);

   const handleFileChange = (details: FileDetails) => {
      console.log('File change details:', details);
      setFiles([...details.acceptedFiles]);
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
      <Box w="100%" {...props}>
         <VStack gap={10}>
            <FileUpload.Root
               maxW="xl"
               alignItems="stretch"
               maxFiles={maxFiles}
               //maxFilesSize={3 * 1024 * 1024} // 3 MB
               accept={'.csv,.xlsx'}
               onFileChange={handleFileChange}
               allowDrop={files.length < maxFiles}
            >
               <FileUpload.HiddenInput />
               <FileUpload.Dropzone>
                  <Icon size="md" color="fg.muted">
                     <LuUpload />
                  </Icon>
                  <FileUpload.DropzoneContent cursor={'pointer'}>
                     <Box>Drag and drop files to upload here</Box>
                     <Box color="fg.muted">{`.csv, .xlsx up to ${maxFiles} files`}</Box>
                     {files.length >= maxFiles && (
                        <Box fontWeight={'bold'} fontStyle={'italic'} mt={5}>
                           ** limit reached **
                        </Box>
                     )}
                  </FileUpload.DropzoneContent>
               </FileUpload.Dropzone>
               <HStack justifyContent={'center'} pt={5}>
                  <Button onClick={() => {}} colorScheme="blue" disabled={files.length === 0}>
                     <LuFileUp />
                     Upload and Process
                  </Button>
               </HStack>
               {files.length > 0 && (
                  <VStack alignItems="flex-start">
                     <Box>Files selected:</Box>
                     <FileUploadList showSize clearable />
                  </VStack>
               )}
            </FileUpload.Root>
            {/* {processedData && (
        <>
          <Text>Download as:</Text>
          <Button onClick={() => handleDownload('json')} colorScheme="green">
            JSON
          </Button>
          <Button onClick={() => handleDownload('xml')} colorScheme="green">
            XML
          </Button>
          <Button onClick={() => handleDownload('csv')} colorScheme="green">
            CSV
          </Button>
        </>
      )} */}
         </VStack>
      </Box>
   );
};
