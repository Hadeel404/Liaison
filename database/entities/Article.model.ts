import { BaseEntity, JoinTable,OneToMany, Column, CreateDateColumn, Entity,ManyToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.model.js";
import { Image } from "./Image.model.js";
import { Tag } from "./Tag.model.js";
import { Category } from "./Category.model.js";
import { Video } from "./Video.model.js";

@Entity('articles')
export class Article extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    articleId: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    content: string;

    @ManyToOne(() => User , user => user.articles)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Category, category => category.articles, {eager: true, cascade: true })
    @JoinColumn()
    category: Category;

    @Column('simple-array', { nullable: true })
    likes: number[] = [];

    @Column('simple-array', { nullable: true })
    shares: number[] = [];

    @ManyToMany(() => Tag, { cascade: true, nullable: true, eager: true })
    @JoinTable()
    tags: Tag[];

    @OneToMany(() => Image, image => image.article,{nullable:true})
    images: Image[];

    @OneToMany(() => Video, (video) => video.article, {cascade: true})
    videos: Video[];
    
    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    createdAt: Date;
}


