import { Request, Response } from 'express';
import { processFile } from '../services/fileService';
import { convertToFormat } from '../utils/fileConverter';

export const uploadFile = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const data = await processFile(req.file);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error processing file' });
  }
};

export const downloadFile = async (req: Request, res: Response) => {
  const { data, format } = req.body;

  if (!data || !format) {
    return res.status(400).json({ error: 'Missing data or format' });
  }

  try {
    const converted = convertToFormat(data, format);
    res.setHeader('Content-Type', `application/${format}`);
    res.setHeader('Content-Disposition', `attachment; filename=processed.${format}`);
    res.send(converted);
  } catch (error) {
    res.status(500).json({ error: `Error converting to ${format}` });
  }
};