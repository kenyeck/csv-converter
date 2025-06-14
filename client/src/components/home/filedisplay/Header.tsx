import { Stack, Box } from "@chakra-ui/react";
import { LuFileSpreadsheet } from "react-icons/lu";
import { MetaData } from "./MetaData";
import { FileData } from "types/file";

interface HeaderProps {
   fileData: FileData;
}

export const Header = ({ fileData }: HeaderProps) => {
   const { file, processedData} = fileData;
   return (
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
            <MetaData
               size={file.size}
               rows={processedData.data.length}
               type={file.type}
               delimiter={processedData.meta.delimiter}
            />
         </Stack>
      </Stack>
   );
};
