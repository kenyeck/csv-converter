import { Box, BoxProps, Card } from '@chakra-ui/react';
import { PreviewConvert } from './PreviewConvert';
import { Header } from './Header';
import { FileData } from 'types/file';

interface FileDisplayProps extends BoxProps {
   fileData: FileData;
   onClose: () => void;
}

export const FileDisplay: React.FC<FileDisplayProps> = (props) => {
   const { fileData, onClose, ...rest } = props;

   return (
      <>
         {fileData && (
            <Box height={'100vh'} w={'100%'} {...rest}>
               <Card.Root variant={'elevated'} w={'100%'}>
                  <Card.Body>
                     <Header fileData={fileData} onClose={onClose} />
                     <PreviewConvert fileData={fileData} />
                  </Card.Body>
               </Card.Root>
            </Box>
         )}
      </>
   );
};
