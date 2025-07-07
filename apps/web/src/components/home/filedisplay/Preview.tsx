'use client';

import { Stack } from "@chakra-ui/react";
import { PreviewHeader } from "./PreviewHeader";
import { PreviewTable } from "./PreviewTable";
import { FileData } from "@models/file";

interface PreviewProps {
   fileData: FileData;
   pageSize: number;
   setPageSize: (pageSize: number) => void;
}

export const Preview = ({ fileData, pageSize, setPageSize }: PreviewProps) => {
   return (
      <Stack direction={'column'}>
         <PreviewHeader setPageSize={setPageSize}/>
         <PreviewTable fileData={fileData} pageSize={pageSize} />
      </Stack>
   );
};
