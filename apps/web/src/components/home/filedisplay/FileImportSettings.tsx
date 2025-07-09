'use client';

import {
   Dialog,
   Box,
   Button,
   Stack,
   CloseButton,
   Select,
   createListCollection,
   ListCollection
} from '@chakra-ui/react';
import { JSX, useState } from 'react';
import { LuFileSpreadsheet, LuFileText, LuPanelsTopLeft, LuRefreshCw } from 'react-icons/lu';

interface EditHeaderProps {
   open: boolean;
   onOpenChange?: (_e: { open: boolean }) => void;
}

export function FileImportSettings({ open, onOpenChange }: EditHeaderProps) {
   const [fileType, setFileType] = useState('csv');
   const [delimiter, setDelimiter] = useState('auto');
   const [encoding, setEncoding] = useState('auto');

   return (
      <Dialog.Root size={'sm'} lazyMount open={open} onOpenChange={onOpenChange}>
         <Dialog.Trigger />
         <Dialog.Backdrop bg={'blackAlpha.800'} />
         <Dialog.Positioner>
            <Dialog.Content>
               <Dialog.CloseTrigger />
               <Dialog.Header justifyContent={'flex-start'}>
                  <Stack alignItems={'flex-start'} mb={6}>
                     <Dialog.Title>File Import Settings</Dialog.Title>
                     <Box color={'fg.muted'} w={'fit-content'}>
                        Configure how your file is processed.
                     </Box>
                  </Stack>
               </Dialog.Header>
               <Dialog.Body>
                  <Stack direction={'column'} justifyContent={'flex-start'} alignItems={'baseline'}>
                     <FileImportSelect
                        label="File Type"
                        collection={fileTypes}
                        value={fileType}
                        onValueChange={setFileType}
                     />
                     <FileImportSelect
                        label="Delimiter"
                        collection={delimiters}
                        value={delimiter}
                        onValueChange={setDelimiter}
                        detected={','}
                     />
                     <FileImportSelect
                        label="Character Encoding"
                        collection={encodings}
                        value={encoding}
                        onValueChange={setEncoding}
                        detected={'UTF8'}
                     />
                  </Stack>
                  <Box color={'fg.muted'} mt={2}>
                     Click &quot;Apply & Reprocess&quot; to parse the file with these settings.
                  </Box>
               </Dialog.Body>
               <Dialog.Footer>
                  <Stack direction={'row'} gap={3} w={'100%'} justifyContent={'flex-end'}>
                     <Button variant={'outline'} onClick={() => onOpenChange?.({ open: false })}>
                        Cancel
                     </Button>
                     <Button
                        variant={'solid'}
                        mr={3}
                        colorScheme={'primary'}
                        onClick={() => {
                           //applyChanges();
                        }}
                     >
                        <LuRefreshCw /> Apply & Reprocess
                     </Button>
                  </Stack>
               </Dialog.Footer>
               <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
               </Dialog.CloseTrigger>
            </Dialog.Content>
         </Dialog.Positioner>
      </Dialog.Root>
   );
}

interface FileImportSelectProps {
   label: string;
   collection: ListCollection<{
      label: string;
      value: string;
      icon?: JSX.Element;
   }>;
   detected?: string;
   value: string;
   onValueChange: (type: string) => void;
}

function FileImportSelect({
   label,
   collection,
   value,
   onValueChange,
   detected
}: FileImportSelectProps) {
   return (
      <Stack mb={4}>
         <Select.Root
            collection={collection}
            size="sm"
            defaultValue={[value]}
            onSelect={(e) => {
               console.log('Selected file type:', e.value);
               onValueChange(e.value);
            }}
            width={'330px'}
         >
            <Select.HiddenSelect />
            <Select.Label>{label}</Select.Label>
            <Select.Control>
               <Select.Trigger>
                  <Select.ValueText>
                     <Stack
                        direction={'row'}
                        justifyContent={'flex-start'}
                        alignItems={'center'}
                        gap={collection.items[0]?.icon ? 2 : 0}
                     >
                        <Box>{collection.items.find((x) => x.value === value)?.icon}</Box>
                        <Box>{collection.items.find((x) => x.value === value)?.label}</Box>
                     </Stack>
                  </Select.ValueText>
               </Select.Trigger>
               <Select.IndicatorGroup>
                  <Select.Indicator />
               </Select.IndicatorGroup>
            </Select.Control>
            <Select.Positioner>
               <Select.Content>
                  {collection.items.map((item) => (
                     <Select.Item item={item} key={item.value}>
                        <Stack
                           direction={'row'}
                           justifyContent={'flex-start'}
                           gap={2}
                           alignItems={'center'}
                        >
                           {value === item.value ? <Select.ItemIndicator /> : <Box minW={'1em'} />}
                           <Box>{item.icon}</Box>
                           <Box>{item.label}</Box>
                        </Stack>
                     </Select.Item>
                  ))}
               </Select.Content>
            </Select.Positioner>
         </Select.Root>
         {value === 'auto' && detected && (
            <Box color={'fg.muted'} fontSize={'0.85em'}>
               {`Detected: ${collection.items.find((x) => x.value === detected)?.label}`}
            </Box>
         )}
      </Stack>
   );
}

type ListCollectionItem = {
   label: string;
   value: string;
   icon?: JSX.Element;
};

const fileTypes = createListCollection<ListCollectionItem>({
   items: [
      {
         label: 'CSV (Comma separated values)',
         value: 'csv',
         icon: <LuPanelsTopLeft color="blue" />
      },
      { label: 'Excel (XLSX)', value: 'xlsx', icon: <LuFileSpreadsheet color="green" /> },
      { label: 'Excel (XLS)', value: 'xls', icon: <LuFileSpreadsheet color="green" /> },
      { label: 'TSV (Tab separated values)', value: 'tsv', icon: <LuPanelsTopLeft color="blue" /> },
      { label: 'Text File', value: 'txt', icon: <LuFileText color="blue" /> }
   ]
});

const delimiters = createListCollection({
   items: [
      { label: 'Auto-detect', value: 'auto' },
      { label: 'Comma (,)', value: ',' },
      { label: 'Semicolon (;)', value: ';' },
      { label: 'Tab (\\t)', value: '\t' },
      { label: 'Pipe (|)', value: '|' },
      { label: 'Hash (#)', value: '#' },
      { label: 'Space', value: ' ' },
      { label: 'Custom', value: 'custom' }
   ]
});

const encodings = createListCollection({
   items: [
      { label: 'Auto-detect', value: 'auto' },
      { label: 'UTF-8 (Unicode)', value: 'UTF8' },
      {
         label: 'Latin-1 (Western European)',
         value: 'LATIN1'
      },
      { label: 'ASCII (English)', value: 'ASCII' }
   ]
});
