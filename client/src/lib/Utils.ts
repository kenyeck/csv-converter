import { filesize } from 'filesize';
import Papa from 'papaparse';
import type { ProcessedData } from 'types/file';

export const messageTimeout = 5000;

export const parseCSV = (file: File): Promise<ProcessedData> => {
   return new Promise((resolve, reject) => {
      Papa.parse(file, {
         complete: (result) => {
            resolve(result as unknown as ProcessedData);
         },
         error: (error) => reject(error)
      });
   });
};

export const getFileSizeAsString = (size: number) => {
   return filesize(size, { round: 0 });
};

export const getFileTypeAsString = (type: string) => {
   switch (type) {
      case 'text/csv':
         return 'csv';
      default:
         throw Error('unknown file type');
   }
};

export const getFileDelimiterAsString = (delimiter: string) => {
   switch (delimiter) {
      case ',':
         return 'Comma (,)';
      default:
         throw Error('unknown file type');
   }
};
