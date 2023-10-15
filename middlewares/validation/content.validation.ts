import express from 'express';

const validateArticle = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
  const values = ['title', 'content'];
  const user = req.body;
  const errorList = values.map(key => !user[key] && `${key} is Required!`).filter(Boolean);

  if (errorList.length) {
    res.status(400).send(errorList);
  } else {
    next();
  }
}



export {
  validateArticle
}