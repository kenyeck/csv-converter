import { Stack } from "@chakra-ui/react";
import { PreviewHeader } from "./PreviewHeader";
import { PreviewTable } from "./PreviewTable";
import { FileData } from "types/file";
import { useState } from "react";

interface PreviewProps {
   fileData: FileData;
}

const defaultPageSize = 10;

export const Preview = ({ fileData }: PreviewProps) => {
   const [pageSize, setPageSize] = useState(defaultPageSize);
   return (
      <Stack direction={'column'}>
         <PreviewHeader setPageSize={setPageSize}/>
         <PreviewTable fileData={fileData} pageSize={pageSize} />
      </Stack>
   );
};
