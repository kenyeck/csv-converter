'use client';

import {
   Stack,
   Box,
   Button,
   InputGroup,
   Input,
   Select,
   Portal,
   createListCollection
} from '@chakra-ui/react';
import { LuType, LuMoveDiagonal, LuSearch } from 'react-icons/lu';
import { defaultPageSize } from './PreviewConvert';

interface PreviewHeaderProps {
   setPageSize: (pageSize: number) => void;
}

export const PreviewHeader = ({ setPageSize }: PreviewHeaderProps) => {
   return (
      <Stack direction={'row'} justifyContent={'space-between'}>
         <Box fontSize={'1.25em'} fontWeight={'semibold'} mb={5}>
            Data Preview
         </Box>
         <Stack direction={'row'} gap={3}>
            <Button size={'sm'} variant={'outline'}>
               <LuType />
               Edit Headers
            </Button>
            <Button size={'sm'} variant={'outline'}>
               <LuMoveDiagonal />
               Fullscreen View
            </Button>
            <InputGroup startElement={<LuSearch />} h={'2.25em'}>
               <Input size={'sm'} placeholder="Search data..." w={'175px'} />
            </InputGroup>
            <Box>
               <Select.Root
                  collection={rows}
                  size="sm"
                  width="100px"
                  defaultValue={[`${defaultPageSize}`]}
                  onValueChange={(e) => {
                     setPageSize(parseInt(e.value[0]));
                  }}
               >
                  <Select.HiddenSelect />
                  <Select.Control>
                     <Select.Trigger>
                        <Select.ValueText />
                     </Select.Trigger>
                     <Select.IndicatorGroup>
                        <Select.Indicator />
                     </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                     <Select.Positioner>
                        <Select.Content>
                           {rows.items.map((row) => (
                              <Select.Item item={row} key={row.value}>
                                 {row.label}
                                 <Select.ItemIndicator />
                              </Select.Item>
                           ))}
                        </Select.Content>
                     </Select.Positioner>
                  </Portal>
               </Select.Root>
            </Box>
         </Stack>
      </Stack>
   );
};

const rows = createListCollection({
   items: [
      { label: '10 Rows', value: '10' },
      { label: '25 Rows', value: '25' },
      { label: '50 Rows', value: '50' },
      { label: '100 Rows', value: '100' }
   ]
});
