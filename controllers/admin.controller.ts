import express from 'express';
import { Article } from '../database/entities/Article.model.js';
import { Image } from '../database/entities/Image.model.js';

const getArticleLikes = async (payload:number) => {
    try{  
      const articleWithLikes = await Article.find({
        //relations:['articles', 'images', 'videos'],
        where: [
          { articleId: Number(payload)  }
        ],
      });
      return articleWithLikes; 
    }catch(error){
      console.log(error);
      throw 'article not found';
    }
}
const getArticleShares = async (payload:number) => {
  try{  
    const articleWithShares = await Article.find({
      //relations:['articles', 'images', 'videos'],
      where: [
        { articleId: Number(payload)  }
      ],
    });
    return articleWithShares; 
  }catch(error){
    console.log(error);
    throw 'article not found';
  }
}
const getArticleLikesCount = async (payload:number) => {
  try{  
    const articleWithLikes = await Article.find({
      where: [
        { articleId: Number(payload)  }
      ],
    });
    const likesCount = articleWithLikes[0].likes ? articleWithLikes[0].likes.length : 0
    return likesCount; 
  }catch(error){
    console.log(error);
    throw 'article not found';
  }
}
const getArticleSharesCount = async (payload:number) => {
  try{  
    const articleWithShares = await Article.find({
      where: [
        { articleId: Number(payload)  }
      ],
    });
    const sharesCount = articleWithShares[0].shares ? articleWithShares[0].shares.length : 0
    return sharesCount; 
  }catch(error){
    console.log(error);
    throw 'article not found';
  }
}

const getArticleAnalytics = async (payload:number) => {
  try {
    const article = await Article.find({
      where: [
        { articleId: Number(payload)  }
      ],
    });

    if (!article) {
      throw "no article"
    }

    const likesCount = article[0].likes ? article[0].likes.length : 0;
    const sharesCount = article[0].shares ? article[0].shares.length : 0;

    const analytics = {
      likes: likesCount,
      shares: sharesCount,
      totalEngagement: likesCount + sharesCount,
    };

    return (analytics);
  } catch (error) {
    console.error(error);
  }
};

const getImageLikes = async (payload:number) => {
  try{  
    const imageWithLikes = await Image.find({
      //relations:['articles', 'images', 'videos'],
      where: [
        { imageId: Number(payload)  }
      ],
    });
    return imageWithLikes; 
  }catch(error){
    console.log(error);
    throw 'image not found';
  }
}
const getImageShares = async (payload:number) => {
try{  
  const imageWithShares = await Image.find({
    //relations:['articles', 'images', 'videos'],
    where: [
      { imageId: Number(payload)  }
    ],
  });
  return imageWithShares; 
}catch(error){
  console.log(error);
  throw 'image not found';
}
}
export { getArticleLikes, getArticleShares, getArticleLikesCount, getArticleSharesCount,getArticleAnalytics,
  getImageLikes, getImageShares}