import { BaseEntity, JoinTable, Relation ,Column, CreateDateColumn, Entity,ManyToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.model.js";
import { Article } from "./Article.model.js";
import { Category } from "./Category.model.js";
import { Tag } from "./Tag.model.js";

@Entity('videos')
export class Video extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    videoId: number;

    @Column({ nullable: false })
    videoPath: string;

    @Column('simple-array', { nullable: true })
    likes: string[] = [];

    @Column('simple-array', { nullable: true })
    shares: string[] = [];
   
    @ManyToOne(() => Article, (article) => article.videos)
    @JoinColumn()
    article: Relation <Article>;

    @ManyToOne(() => User , (user) => user.videos)
    @JoinColumn()
    user: Relation <User>;

    @ManyToOne(() => Category, category => category.videos,{})
    @JoinColumn()
    category: Relation<Category>;

    @ManyToMany(() => Tag, { cascade: true })
    @JoinTable()
    tags: Tag[];

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    createdAt: Date;
}


