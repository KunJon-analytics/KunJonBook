import { Resolver, Query, Arg, Ctx, Int } from "type-graphql";
import { FindManyOptions, Like } from "typeorm";

import { MyContext } from "../types";
import { User, UsersSearch } from "../entities/User";

@Resolver(User)
export class UserResolver {
  @Query(() => UsersSearch, { nullable: true })
  async usersSearch(
    @Ctx() { dataSource }: MyContext,
    @Arg("page", () => Int, { nullable: true }) page: number,
    @Arg("limit", () => Int, { nullable: true }) limit: number,
    @Arg("text") text: string
  ): Promise<UsersSearch> {
    const userRepository = dataSource.getRepository(User);
    if (text.length < 3) {
      return {
        users: [],
      };
    }
    let skip = 0;
    if (page && limit) {
      skip = page * limit;
    }
    let query: FindManyOptions<User> = {
      order: { createdAt: "DESC" },
      skip,
    };
    if (limit) {
      query.take = limit;
    }
    query.where = {
      username: Like(`%${text}%`),
    };

    const users = await userRepository.find(query);

    return {
      users,
    };
  }
}
