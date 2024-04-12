import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { photoController } from './photo.controller';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const source = req.params.source || 'upload';
    let folderPath = 'images';
    folderPath = path.join(folderPath, source);
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

const photoRoute = Router();

photoRoute.post('/:source', upload.single('file'), photoController.uploadPhoto);

export default photoRoute;
