import { ObjectType, Field, Int, InputType } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => Int)
  id?: number;

  @Field()
  username!: string;

  @Field()
  avatar!: string;
}

@InputType()
export class UserInput {
  @Field()
  username!: string;

  @Field()
  avatar!: string;
}
