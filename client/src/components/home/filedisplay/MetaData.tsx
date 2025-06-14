import { Stack } from "@chakra-ui/react";
import { MetaBox } from "./MetaBox";
import { getFileDelimiterAsString, getFileSizeAsString, getFileTypeAsString } from "@lib/Utils";

interface FileDetailsProps {
   size: number;
   rows: number;
   type: string;
   delimiter: string;
}

export const MetaData = ({ size, rows, type, delimiter }: FileDetailsProps) => {
   return (
      <Stack direction={'row'} gap={2} fontSize={'0.8em'}>
         <MetaBox>{getFileSizeAsString(size)}</MetaBox>
         <MetaBox>{`${rows} rows`}</MetaBox>
         <MetaBox uppercase={true}>{getFileTypeAsString(type)}</MetaBox>
         <MetaBox>{getFileDelimiterAsString(delimiter)}</MetaBox>
      </Stack>
   );
};
