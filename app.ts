import './config.js';
// libraries :
import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

// files :
import dataSource, { initDB } from './database/dataSource.js';
import usersRouter from './routes/user.routes.js';
import contentRouter from './routes/content.routes.js';
import indexRouter from './routes/index.router.js';
import { Image } from './database/entities/Image.model.js';


let app = express();
const PORT = 5000;

app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(cookieParser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users', usersRouter);
app.use('/content', contentRouter);
app.use('/', indexRouter);


// error handler
app.use((err: any, req: any, res: any, next: any) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send(err);
});

///////////
// // create/upload image
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(500).send("Failed Upload File!");
    return;
  }
  const fileURL = req.file.destination + req.file.filename;
  const newUploadedImage = Image.create({imagePath: fileURL});
  newUploadedImage.save();
  res.send({
    message: 'File Uploaded Successfully!',
    file: fileURL
  });
});

app.get('/file', (req, res) => {
  const fileName = req.query.name?.toString() || '';
  try {
    const data = fs.readFileSync('uploads/' + fileName, 'utf-8');
    const JSONData = JSON.parse(data) as any[];
    res.send(JSONData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

//////////

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});


app.listen(PORT, () => {
  logger(`App is listening on port ${PORT}`);
  console.log(`App is listening on port ${PORT}`);
  initDB();
});

export default app;
