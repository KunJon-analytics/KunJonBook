import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";

import { Chat } from "../../entities/Chat";

export const ChatsFactory = setSeederFactory(Chat, (faker: Faker) => {
  const chat = new Chat();
  chat.email = faker.internet.email();
  chat.firstName = faker.person.firstName();
  chat.lastName = faker.person.lastName();

  return chat;
});
