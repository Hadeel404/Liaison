import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    JoinTable,
    ManyToMany
  }
    from "typeorm";
  
  import { Permission } from "./Permission.model.js";
  import { User } from "./User.model.js";
  
  @Entity('roles')
  export class Role extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    roleId: number;
  
    @Column({ unique: true })
    roleName: string;
  
    @ManyToMany(() => Permission, { cascade: true, eager: true })
    @JoinTable()
    permissions: Permission[];
  
  }