import express from 'express';
import { insertArticle,getArticlesByTitle,updateArticle,deleteArticle,
  insertCategory,deleteCategory, getCategoryById,
  insertTag,deleteTag,getTagById } from '../controllers/content.controller.js';
import { validateArticle , validateCategory, validateTag} from '../middlewares/validation/content.validation.js';
import { ArticleNs } from '../@types/content.type.js';
import { Article } from '../database/entities/Article.model.js';
import { Category } from '../database/entities/Category.model.js';
import { Tag } from '../database/entities/Tag.model.js';

const router = express.Router();

//Create :
// create article
router.post('/article',validateArticle,(req, res, next) => {
    insertArticle(req.body)
    .then(() => {
      res.status(201).send("artical has been created");
    })
    .catch(error=> {
      console.error(error);
      res.status(500).send(error);
    });
});

// create category
router.post('/category',validateCategory,(req, res, next) => {
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
router.post('/tag',validateTag,(req, res, next) => {
  insertTag(req.body)
  .then(() => {
    res.status(201).send("Tag has been created");
  })
  .catch(error=> {
    console.error(error);
    res.status(500).send(error);
  });
});

// create/upload image
// in app.ts
  
// create/upload video
// in app.ts

//Update :
// update articale
router.put("/article/:id", async (req, res: express.Response) => {
  try {
    await updateArticle(req.body, Number(req.params.id));
    res.status(200).json({ message: "article has been updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
})

//Delete :
// delete articale
router.delete("/article/:id", async (req, res: express.Response) => {
  try {
    await deleteArticle(Number(req.params.id));
    res.status(200).json("article has been deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
// delete category
router.delete("/category/:id", async (req, res: express.Response) => {
  try {
    await deleteCategory(Number(req.params.id));
    res.status(200).json("category has been deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
// delete tag
router.delete("/tag/:id", async (req, res: express.Response) => {
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
router.get('/articles', async (req: ArticleNs.articaleRequest, res) => {
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
// retrive/get all categories
router.get('/categories', async (req: ArticleNs.articaleRequest, res) => {
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
  router.get('/tags', async (req, res) => {
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
router.get('/articles/:title', async (req: ArticleNs.articaleRequest, res) => {
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
router.get('/tag/:id', async (req: express.Request, res) => {
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
router.get('/category/:id', async (req: express.Request, res) => {
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