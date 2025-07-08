'use client';

import { useEffect, useState } from 'react';
import { Box, ButtonGroup, IconButton, Pagination, Stack, Table } from '@chakra-ui/react';
import {
   LuArrowDown,
   LuArrowUp,
   LuArrowUpDown,
   LuChevronLeft,
   LuChevronRight
} from 'react-icons/lu';
import { FileData } from '@models/file';

enum SortDirection {
   none = 'none',
   asc = 'asc',
   desc = 'desc'
}

interface ColumnState {
   name: string;
   sortDirection: SortDirection;
}

interface PreviewTableProps {
   fileData: FileData;
   pageSize: number;
}

export const PreviewTable = ({ fileData, pageSize }: PreviewTableProps) => {
   const [fileContent, setFileContent] = useState<Array<Record<string, string>>>([...fileData.json]);
   const [totalRows, setTotalRows] = useState(0);
   const [page, setPage] = useState(1);
   const [pageRows, setPageRows] = useState<Array<Record<string, string>>>([]);
   const firstRowIsHeader = false;
   const [cols, setCols] = useState<ColumnState[]>(
      Object.keys(fileContent[0] || {}).map((key) => ({
         name: key,
         sortDirection: SortDirection.none
      }))
   );

   // column sort only affects the current page, not the entire dataset. does not chage conversion
   // search affects the entire dataset, but does not change conversion
   // edit headers (rename, reorder, hide) affects the entire dataset and changes conversion
   // page size affects the current page and what's displayed on conversion tab and copied to clipboard, but not download.

   useEffect(() => {
      const startRow = (page - 1) * pageSize + (firstRowIsHeader ? 1 : 0);
      const endRow = page * pageSize + (firstRowIsHeader ? 1 : 0);
      const newRows = fileContent.slice(startRow, endRow);
      // console.log(
      //    `updating page rows: ${startRow}-${endRow}, cols:${cols} ${JSON.stringify(newRows)}`
      // );
      setTotalRows(fileContent.length);
      setPageRows(newRows);
   }, [pageSize, page, firstRowIsHeader, fileContent, cols]);

   const handleSort = (col: ColumnState) => {
      const newCols =
         cols?.map((c) => {
            return {
               ...c,
               sortDirection:
                  c.name === col.name
                     ? c.sortDirection === SortDirection.asc
                        ? SortDirection.desc
                        : SortDirection.asc
                     : SortDirection.none
            };
         }) ?? [];

      const sortedRows = fileContent.sort((a, b) => {
         for (const col of newCols) {
            if (col.sortDirection === SortDirection.asc) {
               if (a[col.name] < b[col.name]) return -1;
               if (a[col.name] > b[col.name]) return 1;
            } else if (col.sortDirection === SortDirection.desc) {
               if (a[col.name] > b[col.name]) return -1;
               if (a[col.name] < b[col.name]) return 1;
            }
         }
         return 0;
      });
      setCols(newCols);
      setFileContent(sortedRows);
   };

   return (
      <Box>
         <Stack w={'full'} gap={5}>
            <Table.ScrollArea borderWidth="1px">
               <Table.Root size="sm" variant={'outline'} px={5}>
                  <Table.Header>
                     <Table.Row>
                        {cols?.map((col) => {
                           return (
                              <Table.ColumnHeader key={col.name}>
                                 <Stack
                                    direction={'row'}
                                    alignItems={'center'}
                                    gap={2}
                                    onClick={() => handleSort(col)}
                                    cursor="pointer"
                                 >
                                    <Box>{col.name}</Box>
                                    {col.sortDirection === SortDirection.asc ? (
                                       <LuArrowUp />
                                    ) : col.sortDirection === SortDirection.desc ? (
                                       <LuArrowDown />
                                    ) : (
                                       <LuArrowUpDown />
                                    )}
                                 </Stack>
                              </Table.ColumnHeader>
                           );
                        })}
                     </Table.Row>
                  </Table.Header>
                  <Table.Body>
                     {pageRows.map((row, i) => {
                        const values = Object.values(row);
                        return (
                           <Table.Row key={i}>
                              {values.map((value, i) => {
                                 return <Table.Cell key={`val${i}`}>{value}</Table.Cell>;
                              })}
                           </Table.Row>
                        );
                     })}
                  </Table.Body>
               </Table.Root>
            </Table.ScrollArea>

            <Pagination.Root
               count={totalRows}
               pageSize={pageSize}
               page={page}
               onPageChange={(e) => setPage(e.page)}
            >
               <ButtonGroup variant="ghost" size="sm" wrap="wrap">
                  <Pagination.PrevTrigger asChild>
                     <IconButton>
                        <LuChevronLeft />
                     </IconButton>
                  </Pagination.PrevTrigger>

                  <Pagination.Items
                     render={(page) => (
                        <IconButton
                           key={page.value}
                           variant={{ base: 'ghost', _selected: 'outline' }}
                        >
                           {page.value}
                        </IconButton>
                     )}
                  />

                  <Pagination.NextTrigger asChild>
                     <IconButton>
                        <LuChevronRight />
                     </IconButton>
                  </Pagination.NextTrigger>
               </ButtonGroup>
            </Pagination.Root>
         </Stack>
      </Box>
   );
};
