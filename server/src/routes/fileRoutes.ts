import express from 'express';
import { uploadFile, downloadFile } from '../controllers/fileController';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), uploadFile);
router.post('/download', downloadFile);

export default router;
