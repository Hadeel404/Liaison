import { BaseEntity, JoinTable, Column, CreateDateColumn, Entity,ManyToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Relation } from "typeorm";
import { User } from "./User.model.js";
import { Article } from "./Article.model.js";
import { Category } from "./Category.model.js";
import { Tag } from "./Tag.model.js";

@Entity('images')
export class Image extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    imageId: number;

    @Column({ nullable: false })
    imagePath: string;

    @Column('simple-array', { nullable: true })
    likes: string[] = [];

    @Column('simple-array', { nullable: true })
    shares: string[] = [];

    @ManyToOne(() => Article , article => article.images, { cascade: true, nullable: true })
    @JoinColumn()
    article: Relation<Article>;

    @ManyToOne(() => User , user => user.images, { cascade: true, nullable: true })
    @JoinColumn()
    user: Relation<User>;

    @ManyToOne(() => Category, category => category.images, { cascade: true, eager: true, nullable: true })
    @JoinColumn()
    category: Relation<Category>;

    @ManyToMany(() => Tag, { cascade: true})
    @JoinTable()
    tags: Tag[];

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    createdAt: Date;
}


