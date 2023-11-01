import express from 'express';
const router = express.Router();

import {getArticleLikes, getArticleShares,getArticleLikesCount, 
  getArticleSharesCount,getArticleAnalytics,
  getImageLikes, getImageShares} from '../controllers/admin.controller.js';
import { Article } from '../database/entities/Article.model.js';

// retrive/get all likes of specific article (by id) :
router.get('/:id/like', async (req: express.Request, res) => {
    try {
      const article = await getArticleLikes(Number(req.params.id));
      res.status(200).json({article});
    }catch(error){
      console.error(error);
      res.status(500).send("Something went wrong!");
    }
})

// retrive/get all shares of specific article (by id) :
router.get('/:id/share', async (req: express.Request, res) => {
  try {
    const article = await getArticleShares(Number(req.params.id));
    res.status(200).json({article});
  }catch(error){
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
})

// retrive/get count of likes of specific article (by id) :
router.get('/:id/likes', async (req: express.Request, res) => {
  try {
    const article = await getArticleLikesCount(Number(req.params.id));
    res.status(200).json({article});
  }catch(error){
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
})

router.get('/:id/shares', async (req: express.Request, res) => {
  try {
    const article = await getArticleSharesCount(Number(req.params.id));
    res.status(200).json({article});
  }catch(error){
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
})

router.get('/:id/analytics', async (req: express.Request, res) => {
  try {
    const analytics = await getArticleAnalytics(Number(req.params.id));
    res.status(200).json({analytics});
  }catch(error){
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
})

// retrive/get all likes of specific image (by id) :
router.get('/image/:id/like', async (req: express.Request, res) => {
  try {
    const image = await getImageLikes(Number(req.params.id));
    res.status(200).json({image});
  }catch(error){
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
})

// retrive/get all shares of specific article (by id) :
router.get('/image/:id/share', async (req: express.Request, res) => {
try {
  const image = await getImageShares(Number(req.params.id));
  res.status(200).json({image});
}catch(error){
  console.error(error);
  res.status(500).send("Something went wrong!");
}
})
export default router;