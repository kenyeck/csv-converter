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
