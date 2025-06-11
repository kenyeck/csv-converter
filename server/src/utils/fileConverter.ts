import Papa from 'papaparse';
//import { js2xml } from 'xml-js';
import type { ProcessedData } from '../types/file';

export const convertToFormat = (data: ProcessedData, format: 'json' | 'xml' | 'csv'): string | Buffer => {
  switch (format) {
    // case 'json':
    //   return JSON.stringify(data);
    case 'csv':
      return Papa.unparse(data.data);
    // case 'xml':
    //   return js2xml({ elements: data.data.map((item: unknown) => ({ type: 'element', name: 'item', elements: Object.entries(item).map(([key, value]) => ({ type: 'element', name: key, elements: [{ type: 'text', text: value }] })) })) });
    default:
      throw new Error('Unsupported format');
  }
};  