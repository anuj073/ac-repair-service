import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, config.uploadDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  },
});

const fileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/pdf',
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WebP, GIF, and PDF are allowed.'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: config.maxFileSize,
    files: 10,
  },
});

export const uploadFields = upload.fields([
  { name: 'issueImages', maxCount: 5 },
  { name: 'beforeImages', maxCount: 5 },
  { name: 'afterImages', maxCount: 5 },
  { name: 'avatar', maxCount: 1 },
  { name: 'idProof', maxCount: 1 },
  { name: 'certification', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 },
  { name: 'images', maxCount: 10 },
]);

export const uploadSingle = upload.single('file');