import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { faker } from "@faker-js/faker";

import { User } from "../../entities/User";
import { Post } from "../../entities/Post";
import { Chat } from "../../entities/Chat";
import { Message } from "../../entities/Message";

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const postsRepository = dataSource.getRepository(Post);
    const messageRepository = dataSource.getRepository(Message);
    const chatRepository = dataSource.getRepository(Chat);

    const userFactory = factoryManager.get(User);
    const postsFactory = factoryManager.get(Post);
    const chatFactory = factoryManager.get(Chat);
    const messageFactory = factoryManager.get(Message);

    const users = await userFactory.saveMany(15);

    const chats = await Promise.all(
      Array(50)
        .fill("")
        .map(async () => {
          const made = await chatFactory.make({
            users: faker.helpers.arrayElements(users, { max: 5, min: 2 }),
          });
          return made;
        })
    );
    await chatRepository.save(chats);

    const posts = await Promise.all(
      Array(50)
        .fill("")
        .map(async () => {
          const made = await postsFactory.make({
            user: faker.helpers.arrayElement(users),
          });
          return made;
        })
    );
    await postsRepository.save(posts);

    const messages = await Promise.all(
      Array(100)
        .fill("")
        .map(async () => {
          const made = await messageFactory.make({
            user: faker.helpers.arrayElement(users),
            chat: faker.helpers.arrayElement(chats),
          });
          return made;
        })
    );
    await messageRepository.save(messages);
  }
}
