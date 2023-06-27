import { Resolver, Query, Arg, Mutation, Ctx, Int } from "type-graphql";

import { Post, PostInput } from "../entities/Post";
import logger from "../helpers/logger";
import { MyContext } from "../types";
import { User } from "../entities/User";

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post])
  async posts(@Ctx() { dataSource }: MyContext): Promise<Post[]> {
    const postRepository = dataSource.getRepository(Post);
    const posts = await postRepository.find({ relations: { user: true } });
    return posts;
  }

  @Mutation(() => Post)
  async addPost(
    @Arg("post") post: PostInput,
    @Arg("userId", () => Int) userId: number,
    @Ctx() { dataSource }: MyContext
  ): Promise<Post> {
    const postRepository = dataSource.getRepository(Post);
    const userRepository = dataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error("User not found");
    }

    const newPost = new Post();
    newPost.text = post.text;
    newPost.user = user;

    const savedUser = postRepository.save(newPost);

    logger.log({ level: "info", message: "Post was created" });
    return savedUser;
  }
}
