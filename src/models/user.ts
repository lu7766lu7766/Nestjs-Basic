import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  // BeforeInsert,
  // BeforeUpdate,
  BaseEntity,
  OneToMany,
} from 'typeorm';
// import { Crypto } from '../library/crypto';
import { Post } from './post';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uid: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: 1 })
  type: number;

  @Column({ default: 'MAIL' })
  gender: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @BeforeInsert()
  // async beforeInsert() {
  //   if (this.password) {
  //     this.password = await Crypto.hash(this.password);
  //   }
  // }

  // @BeforeUpdate()
  // async beforeUpdate() {
  //   if (this.password) {
  //     this.password = await Crypto.hash(this.password);
  //   }
  // }

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
