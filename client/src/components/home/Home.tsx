'use client';

import { Stack, Box, Separator } from '@chakra-ui/react';
import { FileUpload } from '@components/home/FileUpload';
import { useState } from 'react';
import { FileDisplay } from './filedisplay/FileDisplay';
import { FileData } from 'types/file';

export const Home = () => {
   const [fileData, setFileData] = useState<FileData | null>(null);

   const onUpload = (fileData: FileData) => {
      setFileData(fileData);
   };

   return (
      <Stack p={8} direction={'column'} alignItems={'center'}>
         <Stack mb={20} direction={'column'} alignItems={'center'} maxW={'65%'} gap={4}>
            <Box fontSize={'3em'} fontWeight={'bold'} lineHeight={'1em'} textAlign={'center'}>
               Convert CSV & Excel to Clean, Structured Data — Instantly
            </Box>
            <Box fontSize={'1.25em'} textAlign={'center'}>
               Drop your files in. Get perfect JSON, XML, or CSV in seconds. No code, no setup —
               just fast, browser-based data conversion.
            </Box>
         </Stack>
         {fileData ? <FileDisplay fileData={fileData} onClose={() => setFileData(null)} /> : <FileUpload onUpload={onUpload} />}
         <Separator colorPalette={'black'} />
         <Box height={'300px'} w={'100%'} textAlign={'center'} pt={'75px'}>
            MARKETING SECTION
         </Box>
         <Separator />
         <Box height={'300px'} w={'100%'} textAlign={'center'} pt={'75px'}>
            PRICING SECTION
         </Box>
      </Stack>
   );
};
