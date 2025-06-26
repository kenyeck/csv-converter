import { parseCSV, parseXLSX } from '../utils/fileParser';
import type { ProcessedData } from '../types/file';

export const processFile = async (file: Express.Multer.File): Promise<ProcessedData> => {
   const extension = file.originalname.split('.').pop()?.toLowerCase();

   if (extension === 'csv') {
      return parseCSV(file.buffer);
   } else if (extension === 'xlsx') {
      return parseXLSX(file.buffer);
   } else {
      throw new Error('Unsupported file type');
   }
};
