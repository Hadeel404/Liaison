import { BaseEntity, OneToMany, Column, CreateDateColumn, Entity,ManyToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./Article.model.js";
 import { Image } from "./Image.model.js";
 import { Video } from "./Video.model.js";

@Entity('categories')
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    categoryId: number;

    @Column({ nullable: false })
    categoryName: string;

    @OneToMany(() => Article, article => article.category)
    articles: Article[];

    @OneToMany(() => Image, image => image.category)
    images: Image[];

    @OneToMany(() => Video, video => video.category)
    videos: Video[];

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    createdAt: Date;
}


