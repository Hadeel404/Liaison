import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('permissions')
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  permissionId: number;

  @Column({ unique: true })
  permissionName: string;
}