import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";

import { Post } from "../../entities/Post";

export const PostsFactory = setSeederFactory(Post, (faker: Faker) => {
  const post = new Post();
  post.text = faker.lorem.paragraphs({ max: 6, min: 2 });

  return post;
});
