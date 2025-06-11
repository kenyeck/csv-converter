import Papa from 'papaparse';
import type { ProcessedData } from 'types/file';

export const parseCSV = (file: File): Promise<ProcessedData> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (result) => {
        resolve({ data: result.data });
      },
      error: (error) => reject(error),
    });
  });
};