import express from "express";

export namespace ArticleNs{
  // ARTICLE:
  export interface Article{
    id: number;
    title:string;
    content: string;
    //user: number;
    createdAt: Date;
  }

  export interface articaleRequest extends express.Request {
    body: Article,
    // {
    //   id: number,
    //   title: string,
    //   content: string,
    //   //tags: string[]
    // }
    query: {
      page: string;
      pageSize: string;
      titleSubstring?: string;
    }
  }

  export interface articaleReq {
    page: string;
    pageSize: string;
    titleSubstring?: string;  
}

  export interface articaleResponse extends express.Response {
    send: (body: string | {
      page: number,
      pageSize: number,
      total: number,
      articles: Array<Article>   // Item[]
    }) => this
  }

  // CATEGORY: 
  export interface Category{
    id: number;
    categoryName:string;
    //articles?:Article;
    createdAt: Date;
  }
  export interface categoryRequest extends express.Request {
    body: Category,
    query: {
      page: string;
      pageSize: string;
      //titleSubstring?: string;
    }
  }

  // TAG: 
  export interface Tag{
    id: number;
    tagName:string;
    //articles?:Article;
    createdAt: Date;
  }
  export interface tagRequest extends express.Request {
    body: Tag,
    query: {
      page: string;
      pageSize: string;
    }
  }
}