import { EntityModel } from '@midwayjs/orm';
import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel({ name: 'user' })
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column({ name: 'head_img' })
  headImg: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  remark: string;

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  status: number;
}
