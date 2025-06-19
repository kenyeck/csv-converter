import { useEffect, useState } from 'react';
import { Box, ButtonGroup, IconButton, Pagination, Stack, Table } from '@chakra-ui/react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { FileData } from 'types/file';

interface PreviewTableProps {
   fileData: FileData;
   pageSize: number;
}

export const PreviewTable = ({ fileData, pageSize }: PreviewTableProps) => {
   const { json } = fileData;
   const [totalRows, setTotalRows] = useState(0);
   const [page, setPage] = useState(1);
   const [pageRows, setPageRows] = useState<object[] | object[][]>([]);
   const firstRowIsHeader = false;
   const [cols] = useState(Object.keys(json[0] || {}));

   useEffect(() => {
      const startRow = (page - 1) * pageSize + (firstRowIsHeader ? 1 : 0);
      const endRow = page * pageSize + (firstRowIsHeader ? 1 : 0);
      const newRows = json.slice(startRow, endRow);
      // console.log(
      //    `updating page rows: ${startRow}-${endRow}, cols:${cols} ${JSON.stringify(newRows)}`
      // );
      setTotalRows(json.length);
      setPageRows(newRows);
   }, [json, page, pageSize, firstRowIsHeader]);

   return (
      <Box>
         <Stack w={'full'} gap={5}>
            <Table.ScrollArea borderWidth="1px">
               <Table.Root size="sm" variant={'outline'} px={5}>
                  <Table.Header>
                     <Table.Row>
                        {cols.map((col) => {
                           return <Table.ColumnHeader key={col}>{col}</Table.ColumnHeader>;
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
