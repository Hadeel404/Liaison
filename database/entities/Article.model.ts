import { BaseEntity, JoinTable,OneToMany, Column, CreateDateColumn, Entity,ManyToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.model.js";
import { Image } from "./Image.model.js";
import { Tag } from "./Tag.model.js";
import { Category } from "./Category.model.js";
import { Video } from "./Video.model.js";

@Entity('Article')
export class Article extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    articleId: number;

    @Column({ nullable: false })
    content: string;

    @ManyToOne(() => User , user => user.articles, { cascade: true, eager: true })
    @JoinColumn()
    user: User;

    @ManyToOne(() => Category, category => category.articles, { cascade: true, eager: true })
    @JoinColumn()
    category: Category;

    @ManyToMany(() => Tag, { cascade: true, eager: true, nullable: true })
    @JoinTable()
    tags: Tag[];

    @OneToMany(() => Image, image => image.article,{nullable:true, eager: true})
    images: Image[];

    
    @OneToMany(() => Video, (video) => video.article, {eager: true, cascade: true})
    videos: Video[];
    
    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    createdAt: Date;
}


