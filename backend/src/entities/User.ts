import { ObjectType, Field, Int, InputType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post";
import { Message } from "./Message";
import { Chat } from "./Chat";

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column()
  avatar!: string;

  @OneToMany(() => Post, (post) => post.user)
  @Field(() => [Post], { nullable: true })
  posts: Post[];

  @OneToMany(() => Message, (message) => message.user)
  @Field(() => [Message], { nullable: true })
  messages: Message[];

  @Field(() => [Chat], { nullable: true })
  @ManyToMany(() => Chat, (chat) => chat.users)
  chats: Chat[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

@InputType()
export class UserInput {
  @Field()
  username!: string;

  @Field()
  avatar!: string;
}

@ObjectType()
export class UsersSearch {
  @Field(() => [User])
  users: User[];
}
