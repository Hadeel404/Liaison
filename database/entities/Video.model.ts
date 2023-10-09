import { BaseEntity, JoinTable, Column, CreateDateColumn, Entity,ManyToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.model.js";
import { Article } from "./Article.model.js";
import { Category } from "./Category.model.js";
import { Tag } from "./Tag.model.js";

@Entity('Video')
export class Video extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    videoId: number;

    @Column({ nullable: false })
    videoPath: string;
   
    @ManyToOne(() => Article, (article) => article.videos)
    @JoinColumn()
    article: Article;

    @ManyToOne(() => User , (user) => user.videos)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Category, category => category.videos,{})
    @JoinColumn()
    category: Category;

    @ManyToMany(() => Tag, { cascade: true, eager: true })
    @JoinTable()
    tags: Tag[];

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    createdAt: Date;
}


