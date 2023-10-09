import './config.js';
// libraries :
import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
// files :
import dataSource, { initDB } from './database/dataSource.js';

let app = express();
const PORT = 5000;

app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: any, res: any, next: any) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send(err);
});


app.listen(PORT, () => {
  logger(`App is listening on port ${PORT}`);
  console.log(`App is listening on port ${PORT}`);
  initDB();
});

export default app;
