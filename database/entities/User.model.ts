import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany,OneToMany, JoinTable, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from 'bcrypt';
import { Role } from "./Role.model.js";
import { Article } from "./Article.model.js";
import { Image } from "./Image.model.js";
import { Video } from "./Video.model.js";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    userId: number;

    @Column({ length: 40, nullable: false })
    firstName: string;

    @Column({ length: 50, nullable: false })
    lastName: string;

    @Column({ nullable: false,unique: true })
    email: string;

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
        this.password = await bcrypt.hash(this.password, 10)
        }
    }
    @Column({ nullable: false })
    password: string;

    @Column({
        type: 'enum',
        enum: ['admin' , 'editor' , 'contributor'],
        default: 'contributor'
    })
    type: 'admin' | 'editor' | 'contributor';

    @ManyToMany(() => Role, { cascade: true, eager: true })
    @JoinTable()
    roles: Role[];

    @OneToMany(() => Article, article => article.user,{ cascade: true, eager: true })
    articles: Article[];

    @OneToMany(() => Image, image => image.user,{ eager: true })
    images: Image[];

    @OneToMany(() => Video, video => video.user,{ eager: true })
    videos: Video[];

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    createdAt: Date;
}



