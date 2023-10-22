import { BaseEntity, OneToMany, Column, CreateDateColumn, Entity,ManyToMany, JoinTable, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./Article.model.js";
 import { Image } from "./Image.model.js";
 import { Video } from "./Video.model.js";

@Entity('tags')
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    tagId: number;

    @Column({ nullable: false })
    tagName: string;

    @ManyToMany(() => Article, { cascade: true })
    @JoinTable()
    articles: Article[];

    @ManyToMany(() => Image, { cascade: true })
    @JoinTable()
    images: Image[];

    @ManyToMany(() => Video, { cascade: true})
    @JoinTable()
    videos: Video[];

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    createdAt: Date;
}


