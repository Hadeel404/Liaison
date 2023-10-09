import { BaseEntity, JoinTable, Column, CreateDateColumn, Entity,ManyToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.model.js";
import { Article } from "./Article.model.js";
import { Category } from "./Category.model.js";
import { Tag } from "./Tag.model.js";

@Entity('Image')
export class Image extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    imageId: number;

    @Column({ nullable: false })
    imagePath: string;

    @ManyToOne(() => Article , article => article.images, { cascade: true, eager: true, nullable: true })
    @JoinColumn()
    article: Article;

    @ManyToOne(() => User , user => user.images, { cascade: true, eager: true, nullable: true })
    @JoinColumn()
    user: User;

    @ManyToOne(() => Category, category => category.images, { cascade: true, eager: true, nullable: true })
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


