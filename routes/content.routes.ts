import express from 'express';
import { insertArticle,getArticlesByTitle, getArticlesByCat,getArticlesByTag,updateArticle,deleteArticle,
  insertCategory,deleteCategory, getCategoryById,
  insertTag,deleteTag,getTagById,
  LikeSpecificArticle, shareSpecificArticle} from '../controllers/content.controller.js';
import { validateArticle , validateCategory, validateTag} from '../middlewares/validation/content.validation.js';
import { ArticleNs } from '../@types/content.type.js';
import { Article } from '../database/entities/Article.model.js';
import { Category } from '../database/entities/Category.model.js';
import { Tag } from '../database/entities/Tag.model.js';
import { authenticate } from '../middlewares/Auth/Authenticate.js';
import { authorize } from '../middlewares/Auth/Authorize.js';
import multer from 'multer';
import { Image } from '../database/entities/Image.model.js';
import { uploadFile }  from '../services/aws.s3.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + `-${Math.floor(Math.random() * 100)}-` + file.originalname)
  }
});

const upload = multer({ storage });

//Create :
// create article
router.post('/article', authenticate,authorize('Post_articles'),upload.single('image'),validateArticle,async (req, res, next) => {
  const images = [];
  if (req.file) {
    await uploadFile(req.file);
    const fileURL = req.file.destination + req.file.filename;
    const newUploadedImage = Image.create({ imagePath: fileURL });
    await newUploadedImage.save();
    images.push(newUploadedImage);
  }
  insertArticle({...req.body, user: res.locals?.user, images})
    .then(() => {
      res.status(201).send("artical has been created");
    })
    .catch(error=> {
      console.error(error);
      res.status(500).send(error);
    });
});

// create category
router.post('/category',authenticate,authorize('Post_catigories'),validateCategory,(req, res, next) => {
  insertCategory(req.body)
  .then(() => {
    res.status(201).send("category has been created");
  })
  .catch(error=> {
    console.error(error);
    res.status(500).send(error);
  });
});

// create tag
router.post('/tag',authenticate,authorize('Post_tags'),validateTag,(req, res, next) => {
  insertTag(req.body)
  .then(() => {
    res.status(201).send("Tag has been created");
  })
  .catch(error=> {
    console.error(error);
    res.status(500).send(error);
  });
});

// create a like to a Specific post:
router.post("/:id/like",authenticate, async (req, res: express.Response) => { //authorize('Post_like'),
  try {
    const profile = res.locals?.user;
    if(!profile){
      throw "no user found"
    }
    //console.log("ppp"+profile.userId);
    const userId =profile.userId;
    const articleId = Number(req.params.id);
    await LikeSpecificArticle(userId , articleId);
    res.status(201).json();
} catch (error) {
    console.error(error);
    res.status(500).send(error);
}
})
// create a share to a Specific post:
router.post("/:id/share",authenticate, async (req, res: express.Response) => { //authorize('Post_like'),
  try {
    const profile = res.locals?.user;
    if(!profile){
      throw "no user found"
    }
    //console.log("ppp"+profile.userId);
    const userId =profile.userId;
    const articleId = Number(req.params.id);
    await shareSpecificArticle(userId , articleId);
    res.status(201).json();
} catch (error) {
    console.error(error);
    res.status(500).send(error);
}
})
// create/upload image
// in app.ts
  
// create/upload video
// in app.ts

//Update :
// update articale
router.put("/article/:id",authenticate, async (req, res: express.Response) => {
  try {
    const profile = res.locals?.user;
    if(profile.articles.filter((article:any) => article.articleId === +req.params.id).length === 0) {
      return res.status(401).send("You don't have permissions to update this article")
    }
    await updateArticle(req.body, Number(req.params.id));
    res.status(200).json({ message: "article has been updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
})

//Delete :
// delete articale
router.delete("/article/:id",authenticate,async (req, res: express.Response) => {
  try {
    const profile = res.locals?.user;
    if(profile.articles.filter((article:any) => article.articleId === +req.params.id).length === 0) {
      return res.status(401).send("You don't have permissions to update this article")
    }
    await deleteArticle(Number(req.params.id));
    res.status(200).json("article has been deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
// delete category
router.delete("/category/:id",authenticate,authorize('Delete_catigories'),async (req, res: express.Response) => {
  try {
    await deleteCategory(Number(req.params.id));
    res.status(200).json("category has been deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
// delete tag
router.delete("/tag/:id",authenticate,authorize('Delete_tags'), async (req, res: express.Response) => {
  try {
    await deleteTag(Number(req.params.id));
    res.status(200).json("tag has been deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// delete image
// delete video

//Retrive :
// retrive/get all articles
router.get('/articles', authenticate, authorize('Get_articles'),async (req: ArticleNs.articaleRequest, res) => {
  try {
    const page = parseInt(req.query.page || '1');
    const pageSize = parseInt(req.query.pageSize || '10');

    const [articles, total] = await Article.findAndCount({
      relations:{images:true, videos:true},
      skip: pageSize * (page - 1),
      take: pageSize,
      order: {
        createdAt: 'ASC'
      },
    });
  //getAllArticles(req)
    res.send({
      page,
      pageSize: articles.length,
      total,
      articles
    });

  }catch(error){
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
});

// retrive/get articles by category
router.get('/articles/category/:category', authenticate, authorize('Get_articles'),async (req: ArticleNs.articaleRequest, res) => {
  try {
    const category = req.params.category
    const payload={
      page: req.query.page?.toString() || '1',
      pageSize: req.query.pageSize?.toString() || '10',
      category
    };
    const articles = await getArticlesByCat(payload);
    res.status(200).json({
      page: payload.page,
      pageSize: payload.pageSize,
      total: articles.length,
      articles
    });
  }catch(error){
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
});

// retrive/get articles by tag
router.get('/articles/tag/:tag', authenticate, authorize('Get_articles'),async (req: ArticleNs.articaleRequest, res) => {
  try {
    const tag = req.params.tag
    const payload={
      page: req.query.page?.toString() || '1',
      pageSize: req.query.pageSize?.toString() || '10',
      tag
    };
    const articles = await getArticlesByTag(payload);
    res.status(200).json({
      page: payload.page,
      pageSize: payload.pageSize,
      total: articles.length,
      articles
    });
  }catch(error){
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
});

// retrive/get all categories
router.get('/categories', authenticate,authorize('Get_categories'),async (req: ArticleNs.articaleRequest, res) => {
  try {
    const page = parseInt(req.query.page || '1');
    const pageSize = parseInt(req.query.pageSize || '10');

    const [categories, total] = await Category.findAndCount({
      relations:{images:true, videos:true},
      skip: pageSize * (page - 1),
      take: pageSize,
      order: {
        createdAt: 'ASC'
      },
    });
    res.send({
      page,
      pageSize: categories.length,
      total,
      categories
    });

  }catch(error){
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
});
  // retrive/get all tags
  router.get('/tags',authenticate,authorize('Get_tags'), async (req, res) => {
    try {
      const [tags, total] = await Tag.findAndCount({
        //relations:{images:true, videos:true},
        order: {
          createdAt: 'ASC'
        },
      });
      res.send({
        total,
        tags
      });
    }catch(error){
      console.error(error);
      res.status(500).send("Something went wrong getting all tags!");
    }
  });

// retrive/get all images 
// retrive/get all videos

// retrive/get specific articales (by title)
router.get('/articles/:title',authenticate,async (req: ArticleNs.articaleRequest, res) => {
  try {
    const payload={
      page: req.query.page?.toString() || '1',
      pageSize: req.query.pageSize?.toString() || '10',
      titleSubstring: req.query.titleSubstring?.toString() || ''
    };
    const articles = await getArticlesByTitle(payload);
    res.status(200).json({
      page: payload.page,
      pageSize: payload.pageSize,
      titleSubstring: payload.titleSubstring,
      total: articles.length,
      articles
    });
  }catch(error){
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
})

// retrive/get specific tag (by id) with all of the articles related to it
router.get('/tag/:id', authenticate,authorize('Get_tags'),async (req: express.Request, res) => {
  try {
    //const id = Number(req.params);
    const tag = await getTagById(Number(req.params.id));
    res.status(200).json({tag});
  }catch(error){
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
})

// retrive/get specific category (by id) with all of the articles related to it
router.get('/category/:id',authenticate,authorize('Get_categories'), async (req: express.Request, res) => {
  try {
    const category = await getCategoryById(Number(req.params.id));
    res.status(200).json({category});
  }catch(error){
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
})



// retrive/get specific image (by id)
// retrive/get specific video (by id)


export default router;