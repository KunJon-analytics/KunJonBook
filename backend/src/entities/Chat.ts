import { ObjectType, Field, Int, InputType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Message } from "./Message";

@ObjectType()
@Entity()
export class Chat {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column()
  lastName!: string;

  @Field()
  @Column()
  email!: string;

  @OneToMany(() => Message, (message) => message.chat)
  @Field(() => [Message], { nullable: true })
  messages: Message[];

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable()
  users: User[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

@InputType()
export class ChatInput {
  @Field(() => [Int])
  users!: number[];
}
