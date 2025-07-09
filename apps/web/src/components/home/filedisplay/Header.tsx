'use client';

import { useState } from 'react';
import { Stack, Box, Button } from '@chakra-ui/react';
import { LuFileSpreadsheet, LuSettings, LuX } from 'react-icons/lu';
import { MetaData } from './MetaData';
import { FileImportSettings } from './FileImportSettings';
import { FileData } from '@models/file';

interface HeaderProps {
   fileData: FileData;
   onClose: () => void;
}

export const Header = ({ fileData, onClose }: HeaderProps) => {
   const { name, size, type, delimiter, json } = fileData;
   const [open, setOpen] = useState(false);

   return (
      <>
         <Stack direction={'row'} gap={4} justifyContent={'space-between'}>
            <Stack direction={'row'} alignItems={'center'} gap={4}>
               <Box
                  padding={3}
                  color={'fg.muted'}
                  background={'bg.muted'}
                  borderRadius={'5px'}
                  fontSize={'1.5em'}
               >
                  <LuFileSpreadsheet />
               </Box>
               <Stack direction={'column'} gap={1}>
                  <Box fontSize={'1.25em'} fontWeight={'semibold'}>
                     {name}
                  </Box>
                  <MetaData
                     size={size}
                     rows={json?.length ?? 0}
                     type={type}
                     delimiter={delimiter}
                  />
               </Stack>
            </Stack>
            <Stack direction={'row'} gap={4} justifyContent={'space-between'}>
               <Button size={'sm'} variant={'outline'} color={'fg.muted'} onClick={() => setOpen(true)}>
                  <LuSettings />
               </Button>
               <Button size={'sm'} variant={'outline'}>
                  <LuX onClick={() => onClose()} />
               </Button>
            </Stack>
         </Stack>
         <FileImportSettings open={open} onOpenChange={e => setOpen(e.open)} />
      </>
   );
};
