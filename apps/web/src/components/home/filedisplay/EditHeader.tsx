'use client';

import { useEffect, useState } from 'react';
import { Dialog, Box, Button, Stack, CloseButton, Table, Switch, Input } from '@chakra-ui/react';
import { LuArrowDown, LuArrowUp, LuCheck, LuPlus, LuWand } from 'react-icons/lu';

export enum SortDirection {
   none = 'none',
   asc = 'asc',
   desc = 'desc'
}

export interface ColumnState {
   name: string;
   originalName?: string;
   enabled: boolean;
   sampleData?: string;
   dataType?: string;
   sortDirection?: SortDirection;
}

interface EditHeaderProps {
   cols: ColumnState[];
   open?: boolean;
   onOpenChange?: (_e: { open: boolean }) => void;
}

// how to use this component:
// keep track of edits to the header columns - hide, rename, reorder.
// when user clicks save, applyChanges will be called with the updated column state.
// update the fileData.json based on the new column state.
// Maintaining the column state allows columns to be edited while maintaining data consistency.
// The column state should keep the original column names so it can always be mapped back to the original data.

export function EditHeader({ cols, open, onOpenChange }: EditHeaderProps) {
   const [columnState, setColumnState] = useState<ColumnState[]>([]);

   const onChangeEnabled = (col: ColumnState, enabled: boolean) => {
      const newCols = columnState.map((c) =>
         c.name === col.name ? { ...c, enabled } : c
      );
      setColumnState(newCols);
      console.log('Updated column enabled state:', newCols);
   };

   const onChangeOrder = (index: number, direction: 'up' | 'down') => {
      const newCols = [...columnState];
      if (direction === 'up' && index > 0) {
         [newCols[index - 1], newCols[index]] = [newCols[index], newCols[index - 1]];
      } else if (direction === 'down' && index < newCols.length - 1) {
         [newCols[index + 1], newCols[index]] = [newCols[index], newCols[index + 1]];
      }
      setColumnState(newCols);
      console.log('Updated column order:', newCols);
   };

   const onChangeName = (col: ColumnState, name: string) => {
      const newCols = columnState.map((c) =>
         c.name === col.name ? { ...c, name, originalName: c.originalName ?? c.name } : c
      );
      setColumnState(newCols);
      console.log('Updated column names:', newCols);
   };

   const applyChanges = () => {
      // const newFileData = fileData.json.map((row) => {
      //    const newRow: Record<string, string> = {};
      //    columnState.forEach((col) => {
      //       console.log('Processing column:', col);
      //       if (col.originalName && col.name !== col.originalName) {
      //          newRow[col.name] = row[col.originalName] ?? '';
      //       } else {
      //          newRow[col.name] = row[col.name] ?? '';
      //       }
      //    });
      //    return newRow;
      // });
      // setFileData({ ...fileData, json: newFileData });
      // const resetCols = columnState.map((c) => ({ ...c, originalName: undefined }));
      // setColumnState(resetCols);
      // console.log('Applied changes to file data:', newFileData);
      // onOpenChange?.({ open: false });
   };

   useEffect(() => {
      setColumnState(cols);
   }, [cols]);

   return (
      <Dialog.Root size={'lg'} lazyMount open={open} onOpenChange={onOpenChange}>
         <Dialog.Trigger tabIndex={-1} />
         <Dialog.Backdrop bg={'blackAlpha.800'} />
         <Dialog.Positioner>
            <Dialog.Content>
               <Dialog.CloseTrigger tabIndex={-1} />
               <Dialog.Header justifyContent={'flex-start'}>
                  <Dialog.Title>Edit Headers & Configure Fields</Dialog.Title>
               </Dialog.Header>
               <Dialog.Body>
                  <Stack alignItems={'flex-start'} mb={6}>
                     <Box color={'fg.muted'} w={'fit-content'}>
                        Customize field names and properties. Enable or disable fields to control
                        what appears in the output. Field names will become the headers in your
                        data.
                     </Box>
                  </Stack>
                  <Stack direction={'row'} justifyContent={'space-between'} alignItems={'baseline'}>
                     <Box fontWeight={'bold'}>Headers & Fields</Box>
                     <Stack direction={'row'} gap={3} mb={5}>
                        <Button variant={'outline'} size={'sm'}>
                           <LuPlus />
                           <Box>Add Field</Box>
                        </Button>
                        <Button variant={'outline'} size={'sm'}>
                           <LuWand />
                           <Box>Auto Detect Fields</Box>
                        </Button>
                     </Stack>
                  </Stack>
                  <Table.ScrollArea borderWidth="1px">
                     <Table.Root size="sm" variant={'outline'} px={5}>
                        <Table.Header>
                           <TableHeader />
                        </Table.Header>
                        <Table.Body>
                           {columnState.map((col, i) => (
                              <TableRow
                                 key={col.name}
                                 index={i}
                                 col={col}
                                 onChangeEnabled={onChangeEnabled}
                                 onChangeOrder={onChangeOrder}
                                 onChangeName={onChangeName}
                              />
                           ))}
                        </Table.Body>
                     </Table.Root>
                  </Table.ScrollArea>
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
                           applyChanges();
                        }}
                     >
                        <LuCheck /> Save & Apply
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

interface TableRowProps extends Table.RowProps {
   index: number;
   col: ColumnState;
   onChangeEnabled: (col: ColumnState, enabled: boolean) => void;
   onChangeOrder: (index: number, direction: 'up' | 'down') => void;
   onChangeName: (col: ColumnState, name: string) => void;
}

function TableRow({ col, onChangeEnabled, onChangeOrder, onChangeName, index }: TableRowProps) {
   return (
      <Table.Row>
         <Table.Cell>
            <Switch.Root key={'md'} size={'md'} checked={col.enabled} onCheckedChange={(e) => onChangeEnabled(col, e.checked)}>
               <Switch.HiddenInput />
               <Switch.Control />
               <Switch.Label />
            </Switch.Root>
         </Table.Cell>
         <Table.Cell>
            <Input value={col.name} onChange={(e) => onChangeName(col, e.target.value)} />
         </Table.Cell>
         <Table.Cell>{col.sampleData || 'No Data'}</Table.Cell>
         <Table.Cell>{col.dataType || 'Type'}</Table.Cell>
         <Table.Cell>
            <Stack direction={'row'} gap={2}>
               <LuArrowUp cursor={'pointer'} onClick={() => onChangeOrder(index, 'up')} />
               <LuArrowDown cursor={'pointer'} onClick={() => onChangeOrder(index, 'down')} />
            </Stack>
         </Table.Cell>
      </Table.Row>
   );
}

function TableHeader() {
   return (
      <Table.Row>
         <Table.ColumnHeader>Enabled</Table.ColumnHeader>
         <Table.ColumnHeader>Field Name</Table.ColumnHeader>
         <Table.ColumnHeader>Sample Data</Table.ColumnHeader>
         <Table.ColumnHeader>Data Type</Table.ColumnHeader>
         <Table.ColumnHeader>Order</Table.ColumnHeader>
      </Table.Row>
   );
}
