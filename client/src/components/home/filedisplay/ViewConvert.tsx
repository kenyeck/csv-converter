import {
   Box,
   Tabs,
   Stack,
   Separator,
   Button,
   Input,
   InputGroup,
   createListCollection,
   Portal,
   Select
} from '@chakra-ui/react';
import { LuFileJson, LuSearch, LuTable, LuMoveDiagonal, LuType } from 'react-icons/lu';

export const ViewConvert = () => {
   return (
      <Box w={'100%'}>
         <Tabs.Root
            defaultValue="preview"
            variant={'enclosed'}
            mt={4}
            width={'full'}
            background={'bg.muted'}
         >
            <Tabs.List>
               <Tabs.Trigger value="preview" style={{ height: '2.25em' }}>
                  <LuTable />
                  <Box>Preview</Box>
               </Tabs.Trigger>
               <Tabs.Trigger value="convert" style={{ height: '2.25em' }}>
                  <LuFileJson />
                  <Box>Convert</Box>
               </Tabs.Trigger>
            </Tabs.List>
            <Separator />
            <Tabs.Content value="preview" background={'bg'}>
               <Stack direction={'column'}>
                  <PreviewHeader />
                  <PreviewTable />
               </Stack>
            </Tabs.Content>
            <Tabs.Content value="convert" background={'bg'}>
               <Box>***Convert***</Box>
            </Tabs.Content>
         </Tabs.Root>
      </Box>
   );
};

export const PreviewHeader = () => {
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
               <Select.Root collection={rows} size="sm" width="100px" defaultValue={["10"]}>
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

export const PreviewTable = () => {
   return <Box>Preview Table</Box>;
};

const rows = createListCollection({
   items: [
      { label: '10 Rows', value: '10' },
      { label: '20 Rows', value: '20' },
      { label: '50 Rows', value: '50' },
      { label: '100 Rows', value: '100' }
   ]
});
