import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn()
  createdTime: Date;

  @UpdateDateColumn()
  updatedTime: Date;
}
