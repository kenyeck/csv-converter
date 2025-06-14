import { Box, BoxProps, Card, Stack } from '@chakra-ui/react';
import { filesize } from 'filesize';
import { LuFileSpreadsheet } from 'react-icons/lu';
import { FileData } from 'types/file';

interface FileDisplayProps extends BoxProps {
   fileData: FileData;
}

const getFileSize = (size: number) => {
   return filesize(size, { round: 0 });
};

const getFileType = (type: string) => {
   switch (type) {
      case 'text/csv':
         return 'csv';
      default:
         throw Error('unknown file type');
   }
};

const getFileDelimiterInfo = (delimiter: string) => {
   switch (delimiter) {
      case ',':
         return 'Comma (,)';
      default:
         throw Error('unknown file type');
   }
};

export const FileDisplay: React.FC<FileDisplayProps> = (props) => {
   const { fileData, ...rest } = props;
   const { file, processedData } = fileData;

   console.log('FileDisplay:', fileData);
   return (
      <Box w={'100%'} {...rest}>
         <Card.Root variant={'elevated'} w={'100%'}>
            <Card.Header>
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
                        {file.name}
                     </Box>
                     <FileDetails
                        size={file.size}
                        rows={processedData.data.length}
                        type={file.type}
                        delimiter={processedData.meta.delimiter}
                     />
                  </Stack>
               </Stack>
               <Box>Header</Box>
            </Card.Header>
            <Card.Body>
               <Box fontSize={'1.25em'} fontWeight={'semibold'} mb={5}>Data Preview</Box>
               <Box>Preview Table</Box>
            </Card.Body>
         </Card.Root>
      </Box>
   );
};

interface FileDetailsProps {
   size: number;
   rows: number;
   type: string;
   delimiter: string;
}

const FileDetails = ({ size, rows, type, delimiter }: FileDetailsProps) => {
   return (
      <Stack direction={'row'} gap={2} fontSize={'0.8em'}>
         <FileDetailsBox>{getFileSize(size)}</FileDetailsBox>
         <FileDetailsBox>{`${rows} rows`}</FileDetailsBox>
         <FileDetailsBox uppercase={true}>{getFileType(type)}</FileDetailsBox>
         <FileDetailsBox>{getFileDelimiterInfo(delimiter)}</FileDetailsBox>
      </Stack>
   );
};

interface FileDetailsBoxProps {
   uppercase?: boolean;
   children: React.ReactNode;
}
const FileDetailsBox = ({ uppercase = false, children }: FileDetailsBoxProps) => {
   console.log(`FileDetailsBox ${children}, uppercase=${uppercase}`);
   return (
      <Box background={'bg.muted'} paddingX={'8px'} borderRadius={'25px'} textTransform={uppercase ? 'uppercase' : undefined }>
         {children}
      </Box>
   );
};
