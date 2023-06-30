import { Resolver, Query, Arg, Mutation, Ctx, Int } from "type-graphql";

import { Post, PostFeed, PostInput } from "../entities/Post";
import logger from "../helpers/logger";
import { MyContext } from "../types";
import { User } from "../entities/User";
import { FindManyOptions } from "typeorm";

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post])
  async posts(@Ctx() { dataSource }: MyContext): Promise<Post[]> {
    const postRepository = dataSource.getRepository(Post);
    const posts = await postRepository.find({
      relations: { user: true },
      order: {
        createdAt: "DESC",
      },
    });
    return posts;
  }

  @Query(() => PostFeed)
  async postsFeed(
    @Ctx() { dataSource }: MyContext,
    @Arg("page", () => Int, { nullable: true }) page: number,
    @Arg("limit", () => Int, { nullable: true }) limit: number
  ): Promise<PostFeed> {
    const postRepository = dataSource.getRepository(Post);
    let skip = 0;

    if (page && limit) {
      skip = page * limit;
    }

    let query: FindManyOptions<Post> = {
      order: { createdAt: "DESC" },
      skip,
      relations: { user: true },
    };

    if (limit) {
      query.take = limit;
    }
    const posts = await postRepository.find(query);
    return { posts };
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
