import { Box, BoxProps, Card } from '@chakra-ui/react';
import { FileData } from 'types/file';
import { ViewConvert } from './ViewConvert';
import { Header } from './Header';

interface FileDisplayProps extends BoxProps {
   fileData: FileData;
   onClose: () => void;
}

export const FileDisplay: React.FC<FileDisplayProps> = (props) => {
   const { fileData, onClose, ...rest } = props;
   return (
      <Box height={'100vh'} w={'100%'} {...rest}>
         <Card.Root variant={'elevated'} w={'100%'}>
            <Card.Body>
               <Header fileData={fileData} onClose={onClose}/>
               <ViewConvert fileData={fileData} />
            </Card.Body>
         </Card.Root>
      </Box>
   );
};
