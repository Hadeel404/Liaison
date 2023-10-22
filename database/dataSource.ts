import { DataSource } from "typeorm";
import { Article } from "./entities/Article.model.js";
 import { Video } from "./entities/Video.model.js";
import { Category } from "./entities/Category.model.js";
import { Tag } from "./entities/Tag.model.js";
import { User } from "./entities/User.model.js";
import { Role } from "./entities/Role.model.js";
import { Permission } from "./entities/Permission.model.js";
 import { Image } from "./entities/Image.model.js";

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
   User,
   Role,
   Permission,
   Video,
   Article,
   Image,
   Category,
   Tag
  ],
  migrations: ['./**/migration/*.ts'],
  //migrations: [],
  synchronize: true,
  logging: false
});

export const initDB = async () =>
  await dataSource.initialize().then(() => {
    console.log("Connected to DB!");
  }).catch(err => {
    console.error('Failed to connect to DB: ' + err);
  });

export default dataSource;