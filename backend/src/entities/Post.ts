import { ObjectType, Field, Int, InputType } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Post {
  @Field(() => Int)
  id!: number;

  @Field()
  text!: string;

  @Field()
  user: User;
}

@InputType()
export class PostInput {
  @Field()
  text!: string;
}
