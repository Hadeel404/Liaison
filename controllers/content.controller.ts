import { Article } from "../database/entities/Article.model.js";
import {ArticleNs} from "../@types/content.type.js";
import { ILike, Like } from 'typeorm';
import { Category } from '../database/entities/Category.model.js';
import { Tag } from '../database/entities/Tag.model.js';

// create:
const insertArticle = async ({category, tags=[], ...payload}: ArticleNs.Article) => {
  const categoryObj = await Category.findOneBy({categoryName: category})|| undefined
  const tagsObj = tags?.map && tags?.map(tag=>Tag.create({tagName: tag})) || undefined
  const newArticle = Article.create({...payload, category: categoryObj, tags: tagsObj });
  return newArticle.save();
}
const insertCategory = (payload: ArticleNs.Category) => {
  const newCategory = Category.create(payload);
  return newCategory.save();
}
const insertTag = (payload: ArticleNs.Tag) => {
  const newTag = Tag.create(payload);
  return newTag.save();
}
const LikeSpecificArticle = async (usrId: number, articId: number) => {
  try{
    const article = await Article.findOneBy({ articleId:articId });
    if(!article){
      throw "no article";
    }
    if (article.likes === null) {
      article.likes = [];
    }
    //artical.likes = [""+usrId];
    const userExists = article.likes.some(userId => userId === userId);
    if (userExists) {
      console.log('User ID exists in the array.');
    //}

    //if (article.likes.includes(usrId)){
    //  console.log("included")
      article.likes == article.likes.filter(userId => userId !== usrId); //(usrId);
    }else{
      article.likes.push(usrId); 
    }
    await article.save();
  }catch(error){
    console.log(error);
    throw 'could not add a like to article !';
  }
};
const shareSpecificArticle = async (usrId: number, articId: number) => {
  try{
    const article = await Article.findOneBy({ articleId:articId });
    if(!article){
      throw "no article";
    }
    if (article.shares === null) {
      article.shares = [];
    }
    const userExists = article.shares.some(userId => userId === userId);
    if (userExists) {
      console.log('User ID exists in the array.');
      article.shares == article.shares.filter(userId => userId !== usrId); 
    }else{
      article.shares.push(usrId); 
    }
    await article.save();
  }catch(error){
    console.log(error);
    throw 'could not add a like to article !';
  }
};
// read:
const getArticlesByTitle = async (payload: ArticleNs.articaleReq) => {
  const page = parseInt(payload.page);
  const pageSize = parseInt(payload.pageSize);
  const titleSubstring = payload.titleSubstring;

  const articles = await Article.find({
    skip: pageSize * (page - 1),
    take: pageSize,
    order: {
      createdAt: 'DESC'
      // likes: 'DESC',
    },
    where: [
      { title: Like(`%${titleSubstring}%`) }
    ],
    //relations: ['user', '']
  });

  return articles; 
}

const getArticlesByCat = async (payload: ArticleNs.articaleReq) => {
  const page = parseInt(payload.page);
  const pageSize = parseInt(payload.pageSize);
  const category = payload.category||"";
  const articles = await Article.find({
    skip: pageSize * (page - 1),
    take: pageSize,
    order: {
      createdAt: 'DESC'
    },
    where: [
      { category: {categoryName: ILike(category)} }
    ],
  });

  return articles; 
}

const getArticlesByTag = async (payload: ArticleNs.articaleReq) => {
  const page = parseInt(payload.page);
  const pageSize = parseInt(payload.pageSize);
  const tag = payload.tag||"";
  const articles = await Article.find({
    skip: pageSize * (page - 1),
    take: pageSize,
    order: {
      createdAt: 'DESC'
    },
    relations: {tags: true},
    where: [
      { tags: {tagName: ILike(tag)} }
    ],
  });

  return articles; 
}
const getTagById = async (payload:number) => {
  try{  
    const tag = await Tag.find({
      relations:['articles','images', 'videos'],
      where: [
        { tagId: Number(payload)  }
      ],
    });
    return tag; 
  }catch(error){
    console.log(error);
    throw 'tag not found';
  }
}
const getCategoryById = async (payload:number) => {
  try{  
    const category = await Category.find({
      relations:['articles', 'images', 'videos'],
      where: [
        { categoryId: Number(payload)  }
      ],
    });
    return category; 
  }catch(error){
    console.log(error);
    throw 'category not found';
  }
}

// UPDATE:
const updateArticle = async (payload: ArticleNs.Article, id: number) => {
  const article = await Article.findOne({ 
    where: { articleId: id },
    //relations: ['user', '']
   });
  if (!article) {
    throw new Error('article not found');
  }
  if (payload.title) {
    article.title = payload.title;
  }
  if (payload.content) {
    article.content = payload.content;
  }

  try {
    await article.save();
  }catch(error){
    console.error('Error updating article:', error);
  }
};

// DELETE:
const deleteArticle = async (id: number) => {
  const artical = await Article.findOne({ 
    where: { articleId: id }, 
    //relations: ['user', '']
  });

  if (!artical) {
    throw 'article not found'
  }
  await artical.remove();
}
const deleteCategory = async (id: number) => {
  const category = await Category.findOne({ 
    where: { categoryId: id }, 
  });
  if (!category) {
    throw 'category not found'
  }
  await category.remove();
}
const deleteTag = async (id: number) => {
  const tag = await Tag.findOne({ 
    where: { tagId: id }, 
  });
  if (!tag) {
    throw 'tag not found'
  }
  await tag.remove();
}

export { insertArticle,getArticlesByTitle,getArticlesByCat,getArticlesByTag,updateArticle ,deleteArticle,
  insertCategory, deleteCategory,getCategoryById,
  insertTag, deleteTag, getTagById,
  LikeSpecificArticle, shareSpecificArticle}