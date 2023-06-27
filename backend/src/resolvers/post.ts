import { Resolver, Query, Arg, Mutation } from "type-graphql";

import { Post, PostInput } from "../entities/Post";
import { UserInput } from "../entities/User";
import logger from "../helpers/logger";

let posts: Post[] = [
  {
    id: 2,
    text: "Lorem ipsum",
    user: {
      avatar: "/uploads/avatar1.png",
      username: "Test User",
    },
  },
  {
    id: 1,
    text: "Lorem ipsum",
    user: {
      avatar: "/uploads/avatar2.png",
      username: "Test User 2",
    },
  },
];

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return posts;
  }

  @Mutation(() => Post)
  async addPost(
    @Arg("post") post: PostInput,
    @Arg("user") user: UserInput
  ): Promise<Post> {
    const postObject: Post = {
      ...post,
      user,
      id: posts.length + 1,
    };
    posts.push(postObject);
    logger.log({ level: "info", message: "Post was created" });
    return postObject;
  }
}
