import { useEffect, useState } from 'react';
import { Box, ButtonGroup, IconButton, Pagination, Stack, Table } from '@chakra-ui/react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { FileData } from 'types/file';

interface PreviewTableProps {
   fileData: FileData;
}

export const PreviewTable = ({ fileData }: PreviewTableProps) => {
   const { processedData } = fileData;
   const { data: rows } = processedData;
   const [page, setPage] = useState(1);
   const [pageSize, setPageSize] = useState(10);
   const [pageRows, setPageRows] = useState<string[][]>([[]]);
   const [headerRow, setHeaderRow] = useState([]);
   const firstRowIsHeader = true;

   useEffect(() => {
      const startRow = (page - 1) * pageSize + (firstRowIsHeader ? 1 : 0);
      const endRow = page * pageSize + (firstRowIsHeader ? 1 : 0);
      const newRows = rows.slice(startRow, endRow);
      console.log(`updating page rows: ${startRow}-${endRow}`);
      setPageRows(newRows);
   }, [page, pageSize]);

   return (
      <Box>
         <Stack w={'full'} gap={5}>
            <Table.ScrollArea borderWidth="1px">
               <Table.Root size="sm" variant={'outline'} px={5}>
                  {firstRowIsHeader && (
                     <Table.Header>
                        <Table.Row>
                           {rows[0].map((col) => {
                              return <Table.ColumnHeader key={col}>{col}</Table.ColumnHeader>;
                           })}
                        </Table.Row>
                     </Table.Header>
                  )}
                  <Table.Body>
                     {pageRows.map((row, i) => {
                        if (i > (firstRowIsHeader ? 0 : -1)) {
                           return (
                              <Table.Row key={i}>
                                 {row.map((col, i) => {
                                    return <Table.Cell key={`col${i}`}>{col}</Table.Cell>;
                                 })}
                              </Table.Row>
                           );
                        }
                     })}
                  </Table.Body>
               </Table.Root>
            </Table.ScrollArea>

            <Pagination.Root
               count={rows.length}
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
