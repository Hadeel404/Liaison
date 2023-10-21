import express from 'express';
import { insertArticle, getAllArticles } from '../controllers/content.controller.js';
import { validateArticle } from '../middlewares/validation/content.validation.js';

const router = express.Router();

//Create :
// create article
router.post('/article',validateArticle,async(req, res, next) => {
    insertArticle(req.body).then(() => {
      res.status(201).send("artical has been created");
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

// create/upload image
// in app.ts
  
// create/upload video
// in app.ts

//Update :
// update articale

//Delete :
// delete articale
// delete image
// delete video

//Retrive :
// retrive/get all articles
router.get('/articles', (req, res, next) => {
    // const payload = {
    //   page: req.query.page?.toString() || '1',
    //   pageSize: req.query.pageSize?.toString() || '10'
    // };
  
   // getAllArticles(payload)
   getAllArticles(req.body)
      .then(data => {
        res.send(data);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Something went wrong while getting All Articles')
      });
  });
// retrive/get all images 
router.get('/images', (req, res, next) => {
    const payload = {
      page: req.query.page?.toString() || '1',
      pageSize: req.query.pageSize?.toString() || '10'
    };
  
    getAllArticles(req.body)
      .then(data => {
        res.send(data);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Something went wrong while getting All images')
      });
  });
// retrive/get all videos
router.get('/videos', (req, res, next) => {
    const payload = {
      page: req.query.page?.toString() || '1',
      pageSize: req.query.pageSize?.toString() || '10'
    };
  
    getAllArticles(req.body)
      .then(data => {
        res.send(data);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Something went wrong while getting All videos')
      });
  });

// retrive/get specific articale (by id)
// retrive/get specific image (by id)
// retrive/get specific video (by id)


export default router;