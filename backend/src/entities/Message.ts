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
import { Chat } from "./Chat";

@ObjectType()
@Entity()
export class Message {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column("text")
  text!: string;

  @Field(() => Int)
  @Column()
  userId!: number;

  @Field(() => Int)
  @Column()
  chatId!: number;

  @Field(() => Chat)
  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat!: Chat;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.messages)
  user!: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

@InputType()
export class MessageInput {
  @Field()
  text!: string;

  @Field(() => Int)
  chatId!: number;
}
