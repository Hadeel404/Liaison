# Liaison

Liaison is a Content Management System (CMS) project that aims to develop a backend system for managing and serving content. This system will allow users to create, retrieve, update, and delete various types of content, such as articles, images, and videos. The project is built using ExpressJS with TypeORM, and it includes a focus on unit testing using Jest for specific functions and API endpoints.

## Table of Contents

- [Liaison](#liaison)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [API Documentation](#api-documentation)
    - [Content Routes](#content-routes)
      - [Create Article](#create-article)
      - [Create Category](#create-category)
      - [Create Tag](#create-tag)
      - [Update Article](#update-article)
      - [Delete Article](#delete-article)
      - [Delete Category](#delete-category)
      - [Delete Tag](#delete-tag)
      - [Retrieve All Articles](#retrieve-all-articles)
      - [Retrieve All Categories](#retrieve-all-categories)
      - [Retrieve All Tags](#retrieve-all-tags)
      - [Retrieve Articles by Title](#retrieve-articles-by-title)
      - [Retrieve Tag by ID](#retrieve-tag-by-id)
      - [Retrieve Category by ID](#retrieve-category-by-id)
      - [Retrieve Image by ID](#retrieve-image-by-id)
      - [Retrieve Video by ID](#retrieve-video-by-id)
    - [User Routes](#user-routes)
      - [Register](#register)
      - [Update User Profile](#update-user-profile)
      - [Get User Profile](#get-user-profile)
      - [Get User Roles](#get-user-roles)
      - [List Permissions](#list-permissions)
      - [Login](#login)
      - [Logout](#logout)
      - [Create Permission](#create-permission)

## Description

Liaison is a project that contains:

1. **User Authentication:** Implement user registration, login, and authentication mechanisms to allow users to create and manage their accounts.
2. **Content Creation:** Implement functionality to create and store various types of content, such as articles, images, and videos, in a structured manner.
3. **Content Categories and Tags:** Add support for categorizing and tagging content items to improve organization and discoverability.
4. **Content Retrieval:** Develop APIs to retrieve content based on different criteria, including content type, category, and date.
5. **Content Updating:** Allow authorized users to update and edit existing content.
6. **User Roles and Permissions:** Define different user roles (e.g., admin, editor, contributor) with varying levels of access and permissions to manage content.
7. **Content Analytics:** Integrate analytics and tracking features to provide insights into content performance, including views, likes, shares, and user engagemen

## Project Structure

A high-level overview of your project's file structure:

```
.
├── .babelrc
├── @types
│   ├── content.type.ts
│   └── user.type.ts
├── app.ts
├── config.ts
├── controllers
│   ├── content.controller.ts
│   └── user.controller.ts
├── database
│   ├── dataSource.ts
│   └── entities
│       ├── Article.model.ts
│       ├── Category.model.ts
│       ├── Image.model.ts
│       ├── Permission.model.ts
│       ├── Role.model.ts
│       ├── Tag.model.ts
│       ├── User.model.ts
│       └── Video.model.ts
├── middlewares
│   ├── Auth
│   │   ├── Authenticate.ts
│   │   └── Authorize.ts
│   └── validation
│       ├── content.validation.ts
│       └── user.validation.ts
├── package.json
├── routes
│   ├── content.routes.ts
│   ├── index.router.ts
│   └── user.routes.ts
├── uploads
└── __test__
    └── user.test.js
```

## Getting Started

Instructions for setting up your project locally.

### Prerequisites

**You need to create .env file that contains these parameters and give them values**

- DB_HOST
- DB_PORT
- DB_USER_NAME
- DB_PASSWORD
- DB_NAME
- SECRET_KEY

**You need to install these**

- node js
- vs code

### Installation

A step-by-step guide to install and run your project.
```
npm i
npm run dev
```
## API Documentation

Explain how to use your project's APIs, including request/response examples.

### Content Routes

#### Create Article

- **Endpoint:** `POST /content/article`
- **Description:** Create a new article.
- **Request Body:**
  - `title` (string, required): Title of the article.
  - `content` (string, required): Content of the article.
- **Response:**
  - Status Code 201: Article created successfully.
  - Status Code 400: Error in creating the article.

#### Create Category

- **Endpoint:** `POST /content/category`
- **Description:** Create a new category.
- **Request Body:**
  - `categoryName` (string, required): Name of the category.
- **Response:**
  - Status Code 201: Category created successfully.
  - Status Code 400: Error in creating the category.

#### Create Tag

- **Endpoint:** `POST /content/tag`
- **Description:** Create a new tag.
- **Request Body:**
  - `tagName` (string, required): Name of the tag.
- **Response:**
  - Status Code 201: Tag created successfully.
  - Status Code 400: Error in creating the tag.

#### Update Article

- **Endpoint:** `PUT /content/article/:id`
- **Description:** Update an existing article.
- **Request Body:**
  - `title` (string, optional): New title of the article.
  - `content` (string, optional): New content of the article.
- **Response:**
  - Status Code 200: Article updated successfully.
  - Status Code 500: Error in updating the article.

#### Delete Article

- **Endpoint:** `DELETE /content/article/:id`
- **Description:** Delete an article by its ID.
- **Response:**
  - Status Code 200: Article deleted successfully.
  - Status Code 500: Error in deleting the article.

#### Delete Category

- **Endpoint:** `

DELETE /content/category/:id`
- **Description:** Delete a category by its ID.
- **Response:**
  - Status Code 200: Category deleted successfully.
  - Status Code 500: Error in deleting the category.

#### Delete Tag

- **Endpoint:** `DELETE /content/tag/:id`
- **Description:** Delete a tag by its ID.
- **Response:**
  - Status Code 200: Tag deleted successfully.
  - Status Code 500: Error in deleting the tag.

#### Retrieve All Articles

- **Endpoint:** `GET /content/articles`
- **Description:** Retrieve a list of all articles.
- **Query Parameters:**
  - `page` (number, optional): Page number for pagination.
  - `pageSize` (number, optional): Number of articles per page.
- **Response:**
  - Status Code 200: List of articles retrieved successfully.
  - Status Code 500: Error in retrieving articles.

#### Retrieve All Categories

- **Endpoint:** `GET /content/categories`
- **Description:** Retrieve a list of all categories.
- **Query Parameters:**
  - `page` (number, optional): Page number for pagination.
  - `pageSize` (number, optional): Number of categories per page.
- **Response:**
  - Status Code 200: List of categories retrieved successfully.
  - Status Code 500: Error in retrieving categories.

#### Retrieve All Tags

- **Endpoint:** `GET /content/tags`
- **Description:** Retrieve a list of all tags.
- **Response:**
  - Status Code 200: List of tags retrieved successfully.
  - Status Code 500: Error in retrieving tags.

#### Retrieve Articles by Title

- **Endpoint:** `GET /content/articles/:title`
- **Description:** Retrieve articles that match the given title.
- **Query Parameters:**
  - `page` (number, optional): Page number for pagination.
  - `pageSize` (number, optional): Number of articles per page.
  - `titleSubstring` (string, optional): Substring to search for in article titles.
- **Response:**
  - Status Code 200: List of matching articles retrieved successfully.
  - Status Code 500: Error in retrieving articles.

#### Retrieve Tag by ID

- **Endpoint:** `GET /content/tag/:id`
- **Description:** Retrieve a tag by its ID along with all related articles.
- **Response:**
  - Status Code 200: Tag and related articles retrieved successfully.
  - Status Code 500: Error in retrieving tag and articles.

#### Retrieve Category by ID

- **Endpoint:** `GET /content/category/:id`
- **Description:** Retrieve a category by its ID along with all related articles.
- **Response:**
  - Status Code 200: Category and related articles retrieved successfully.
  - Status Code 500: Error in retrieving category and articles.

#### Retrieve Image by ID

- **Endpoint:** `GET /content/image/:id`
- **Description:** Retrieve an image by its ID.
- **Response:**
  - Status Code 200: Image retrieved successfully.
  - Status Code 500: Error in retrieving the image.

#### Retrieve Video by ID

- **Endpoint:** `GET /content/video/:id`
- **Description:** Retrieve a video by its ID.
- **Response:**
  - Status Code 200: Video retrieved successfully.
  - Status Code 500: Error in retrieving the video.

### User Routes

#### Register

- **Endpoint:** `POST /user/register`
- **Description:** Register a new user.
- **Request Body:**
  - `firstName` (string, required): First name of the user.
  - `lastName` (string, required): Last name of the user.
  - `email` (string, required): Email address of the user.
  - `password` (string, required): User password (at least 6 characters).
- **Response:**
  - Status Code 201: User registered successfully.
  - Status Code 400: Error in user registration.

#### Update User Profile

- **Endpoint:** `PUT /user/profile`
- **Description:** Update the profile of the authenticated user.
- **Request Body:**
  - `firstName` (string, optional): New first name of the user.
  - `lastName` (string, optional): New last name of the user.
  - `email` (string, optional): New email address of the user.
  - `password` (string, optional): New user password (at least 6 characters).
- **Response:**
  - Status Code 200: User profile updated successfully.
  - Status Code 500: Error in updating the user profile.
  - Status Code 404: User not found.

#### Get User Profile

- **Endpoint:** `GET /user/profile`
- **Description:** Retrieve the profile of the authenticated user.
- **Response:**
  - Status Code 200: User profile retrieved successfully.
  - Status Code 404: User not found.

#### Get User Roles

- **Endpoint:** `GET /user/roles`
- **Description:** Retrieve the roles of the authenticated user.
- **Response:**
  - Status Code 200: User roles retrieved successfully.
  - Status Code 404: User not found.

#### List Permissions

- **Endpoint:** `GET /user/permissions/list`
- **Description:** List permissions of the authenticated user.
- **Response:**
  - Status Code 200: List of permissions retrieved successfully.
  - Status Code 404: User not found.

#### Login

- **Endpoint:** `POST /user/login`
- **Description:** User login.
- **Request Body:**
  - `email` (string, required): User email.
  - `password` (string, required): User password.
- **Response:**
  - Status Code 200: User logged in successfully. Cookies are set.
  - Status Code 401: Unauthorized (Invalid credentials).

#### Logout

- **Endpoint:** `POST /user/logout`
- **Description:** User logout. Clears cookies.
- **Response:**
  - Status Code 200: User logged out successfully.

#### Create Permission

- **Endpoint:** `POST /user/permission/create`
- **Description:** Create a new permission.
- **Request Body:**
  - `permissionName` (string, required): Name of the permission.
  - `RoleName` (string, required): Name of the role to
