import express from 'express';
import { Article } from "../database/entities/Article.model.js";

const insertArticle = (payload: Article) => {
    const newArticle = Article.create(payload);
    return newArticle.save();
}

const getAllArticles  = async (payload: Article[]) => {
    // const page = parseInt(payload.page);
    // const pageSize = parseInt(payload.pageSize);
  
    const [articles, total] = await Article.findAndCount({
      order: {
        createdAt: 'ASC'
      },
    })
  
    return {
     // page,
      pageSize: articles.length,
      total,
      articles
    };
  }

export { insertArticle, getAllArticles }