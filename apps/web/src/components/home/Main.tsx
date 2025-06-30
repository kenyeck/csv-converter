import { useState } from 'react';
import { Section } from './Section';
import { FileDisplay } from './filedisplay/FileDisplay';
import { FileUpload } from './FileUpload';
import { processFile } from '../../lib/Utils';
import { FileData } from '../../models/file';

export const Main = () => {
   const [fileData, setFileData] = useState<FileData | null>(null);

   const onUpload = async (file: File) => {
      // todo: display loading/processing state for large files (>200K?)
      const fileData = await processFile(file);
      setFileData(fileData);
   };

   return (
      <Section
         id="file-conversion"
         py={'3em'}
         title={'Convert CSV & Excel to Clean, Structured Data — Instantly'}
         subTitle={
            'Drop your files in. Get perfect JSON, XML, or CSV in seconds. No code, no setup — just fast, browser-based data conversion.'
         }
      >
         {fileData ? (
            <FileDisplay fileData={fileData} onClose={() => setFileData(null)} />
         ) : (
            <FileUpload onUpload={onUpload} />
         )}
      </Section>
   );
};
