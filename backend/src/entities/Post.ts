import { ObjectType, Field, Int, InputType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column("text")
  text!: string;

  @Field(() => Int)
  @Column()
  userId!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  user!: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

@InputType()
export class PostInput {
  @Field()
  text!: string;
}

@ObjectType()
export class PostFeed {
  @Field(() => [Post])
  posts: Post[];
}
