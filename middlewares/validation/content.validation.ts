import express from 'express';

const validateArticle = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const values = ['title', 'content'];
  const artical = req.body;
  //const errorList = [];
  const errorList = values.map(key => !artical[key] && `${key} is Required!`).filter(Boolean);
 
  // if(artical.title = '' || undefined){
  //   errorList.push('title is required!');
  // }
  // if(artical.content = '' || undefined){
  //   errorList.push('content is required!');
  // }


  if (errorList.length) {
    res.status(400).send(errorList);
  } else {
    next();
  }
}

const validateCategory = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const values = ['categoryName'];
  const artical = req.body;
  const errorList = values.map(key => !artical[key] && `${key} is Required!`).filter(Boolean);

  if (errorList.length) {
    res.status(400).send(errorList);
  } else {
    next();
  }
}
const validateTag = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const values = ['tagName'];
  const artical = req.body;
  const errorList = values.map(key => !artical[key] && `${key} is Required!`).filter(Boolean);

  if (errorList.length) {
    res.status(400).send(errorList);
  } else {
    next();
  }
}
export {
  validateArticle,
  validateCategory,
  validateTag
}