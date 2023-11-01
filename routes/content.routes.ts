import express from 'express';
import { insertArticle,getArticlesByTitle,updateArticle,deleteArticle,
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

const router = express.Router();

//Create :
// create article
router.post('/article',authorize('Post_articles'),authenticate,validateArticle,(req, res, next) => {
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
router.post('/category',authorize('Post_categories'),authenticate,validateCategory,(req, res, next) => {
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
router.post('/tag',authorize('Post_tags'),authenticate,validateTag,(req, res, next) => {
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
router.post("/:id/like",authorize('Post_like'),authenticate, async (req, res: express.Response) => { //authorize('Post_like'),
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
router.post("/:id/share",authorize('Post_share'),authenticate, async (req, res: express.Response) => { //authorize('Post_like'),
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
router.put("/article/:id",authorize('Put_articles'),authenticate, async (req, res: express.Response) => {
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
router.delete("/article/:id",authorize('Delete_articles'),authenticate,async (req, res: express.Response) => {
  try {
    await deleteArticle(Number(req.params.id));
    res.status(200).json("article has been deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
// delete category
router.delete("/category/:id",authorize('Delete_categories'),authenticate,async (req, res: express.Response) => {
  try {
    await deleteCategory(Number(req.params.id));
    res.status(200).json("category has been deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
// delete tag
router.delete("/tag/:id",authorize('Delete_tags'),authenticate, async (req, res: express.Response) => {
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
router.get('/articles',authorize('Get_articles'), authenticate,async (req: ArticleNs.articaleRequest, res) => {
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
router.get('/categories',authorize('Get_categories'), authenticate,async (req: ArticleNs.articaleRequest, res) => {
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
  router.get('/tags',authorize('Get_tags'),authenticate, async (req, res) => {
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
router.get('/articles/:title',authorize('Get_article'),authenticate,async (req: ArticleNs.articaleRequest, res) => {
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
router.get('/tag/:id',authorize('Get_tag'), authenticate,async (req: express.Request, res) => {
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
router.get('/category/:id',authorize('Get_category'),authenticate, async (req: express.Request, res) => {
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